
type EventName = 'PostJobPage_Visted' | 'JobForm_Submiting'
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