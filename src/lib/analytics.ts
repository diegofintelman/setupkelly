export type EventName = 'idx_engagement' | 'page_view' | 'view_development' | 'view_property' | 'property_search' | 'click_whatsapp' | 'start_form' | 'submit_lead' | 'view_article' | 'download_resource' | 'newsletter_signup';
export type EventContext = { page_type?: string; development_id?: string; property_id?: string; article_id?: string; neighborhood_id?: string; cta_location?: string; traffic_source?: string; campaign?: string; result_count?: number };
export interface AnalyticsAdapter { track(name: EventName, context: EventContext): void }
// Local observable event only. No storage, identifiers, PII, remote scripts or requests.
export const analytics: AnalyticsAdapter = { track(name, context) {
  if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('kelly:preview-event', {detail:{name,context,mode:'mock'}}));
} };
