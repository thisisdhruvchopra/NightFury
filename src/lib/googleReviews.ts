/**
 * Live Google reviews from the Nightfury Business Profile, via the Places API (New).
 *
 * Needs two environment variables (Vercel > Settings > Environment Variables):
 *   GOOGLE_PLACES_API_KEY  a key with "Places API (New)" enabled
 *   GOOGLE_PLACE_ID        the Business Profile's Place ID (starts with "ChIJ")
 *
 * The response is cached for 6 hours, so the API is called about 120 times a month,
 * well inside Google's free monthly usage. Google returns at most 5 reviews.
 */

export type GoogleReview = {
  author: string;
  authorUrl?: string;
  authorPhoto?: string;
  rating: number;
  text: string;
  when: string;
};

export type GoogleReviewSummary = {
  rating?: number;
  count: number;
  mapsUrl?: string;
  reviews: GoogleReview[];
};

type PlacesResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: {
    rating?: number;
    text?: { text?: string };
    originalText?: { text?: string };
    relativePublishTimeDescription?: string;
    authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
  }[];
};

export const REVIEWS_REVALIDATE = 21600;

export async function getGoogleReviews(): Promise<GoogleReviewSummary | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) return null;

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=en`, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews",
      },
      next: { revalidate: REVIEWS_REVALIDATE },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as PlacesResponse;

    const reviews = (data.reviews ?? [])
      .map((r) => ({
        author: r.authorAttribution?.displayName ?? "Google user",
        authorUrl: r.authorAttribution?.uri,
        authorPhoto: r.authorAttribution?.photoUri,
        rating: r.rating ?? 0,
        text: (r.text?.text ?? r.originalText?.text ?? "").trim(),
        when: r.relativePublishTimeDescription ?? "",
      }))
      // Only reviews with something written, and good ones first.
      .filter((r) => r.text)
      .sort((a, b) => b.rating - a.rating);

    return { rating: data.rating, count: data.userRatingCount ?? 0, mapsUrl: data.googleMapsUri, reviews };
  } catch {
    return null;
  }
}
