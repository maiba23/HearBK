import mixpanel from "mixpanel-browser";

export const initMixpanel = () => mixpanel.init("a16ecaf98955cbb29ef42e6e65c794c6");

export const aliasMixpanel = USER_ID => mixpanel?.alias(USER_ID); // when user signup, alias is used to map user analytics before they signed up so that we can know how user get triggered to signup

export const identifyMixpanel = USER_ID => mixpanel?.identify(USER_ID);

export const setPeopleMixpanel = ({ email, name, username }) =>
  mixpanel?.people?.set({
    $email: email,
    full_name: name,
    username: username,
  });

export const trackMixpanel = (eventName, eventPayload) => mixpanel?.track(eventName, eventPayload);
