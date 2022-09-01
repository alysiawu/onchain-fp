
type EventName = 'PostJobPage_Visted' 
| 'JobForm_Submiting'
| 'JobFormTitle_Missing'
| 'JobFormDescription_Missing'
| 'JobFormVideo_Missing'
| 'JobFormEmail_Missing'
| 'JobForm_Success'

| 'QuickApplyPage_Visted'
| 'QuickApplyPage_Submitting'
| 'QuickApplyPage_Success'

| 'TalentPitchPage_Visted'
| 'TalentPitchPage_Submitting'
| 'TalentPitchPage_Success'

| 'InterviewerApplyPage_Visted'
| 'InterviewerApplyPage_Submitting'
| 'InterviewerApplyPage_Success'

| 'TalentOnboardPage_Visited'
| 'TalentOnboardPage_Submitting'
| 'TalentOnboardPage_Success'

| 'TalentOnboardingClaimPage_Visited'
| 'TalentOnboardingClaimPage_Submitting'
| 'TalentOnboardingClaimPage_Success'


| 'TalentProfileGatedSpace_Visited'
| 'TalentProfileGatedSpace_Submitting'
| 'TalentProfileGatedSpace_Success'

| 'PostReferralBountyTitle_Missing'
| 'PostReferralBountyPage_Visted'
| 'PostReferralBountyPage_Submitting'
| 'PostReferralBountyPage_Success'

| 'PostReferralTitle_Missing'
| 'PostReferralPage_Visted'
| 'PostReferralPage_Submitting'
| 'PostReferralPage_Success'

| 'ReferralOpposPage_Visted'
| 'ReferralOpposPage_Submitting'
| 'ReferralOpposPage_Success'

| 'SearchProPage_Visted'
| 'SearchProPage_Submitting'
| 'SearchProPage_Success'

| 'ReferralCard_ClickRequest'

| 'RequestReferralPage_Visted'
| 'RequestReferralPage_Submitting'
| 'RequestReferralPage_Success'



export const trackEvent = (eventName: EventName, metadata: any) => {
    if ((window as any).analytics) {
        // let position
        //  const watchID = navigator.geolocation.watchPosition((position) => {
        //    // doSomething(position.coords.latitude, position.coords.longitude);
        //    position = position
       
        //  });
       
       
         (window as any).analytics.track(eventName, {
             ...metadata,
            userAgent: window.navigator.userAgent,
            url: window.location.href,
        //    geolocation: position,
        //    watchID,
         })
       }
    
}