import type {LeadProvider} from './contracts';
// No storage or networking. Repeated request IDs produce the same preview receipt.
export const mockLeadProvider:LeadProvider={async submit(input){return {ok:true,mode:'mock',receiptId:`preview-${input.requestId}`,persisted:false}}};