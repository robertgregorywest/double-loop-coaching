import React, { useEffect, useState } from "react";
import { initializeAndTrack } from "gatsby-plugin-gdpr-cookies";
import { Container, Section, FlexList, Button } from "./ui";
import {
  backgroundWrapper,
  containerWrapper,
  sectionWrapper,
} from "./cookie-banner.css";

const CookieNotice = ({
  children,
  acceptButtonText,
  declineButton,
  declineButtonText,
  personalizeButtonText,
  cookies,
  cookieDays,
  personalizeButtonEnable,
  personalizeValidationText,
}) => {
  const [displayCookieList, setDisplayCookieList] = useState();
  const [displayCookieNotice, setDisplayCookieNotice] = useState();

  const text = {
    acceptButton: acceptButtonText,
    declineButton: declineButtonText,
    personalizeButton: personalizeButtonText,
    personalizeValidation: personalizeValidationText,
  };

  const prop = {
    declineButtonActivated: declineButton,
    cookiesList: cookies,
    cookieDays: cookieDays,
    personalizeButton: personalizeButtonEnable,
  };

  let date = new Date();
  date.setTime(date.getTime() + prop.cookieDays * 24 * 60 * 60 * 1000);
  const expires = "; expires=" + date.toUTCString();

  const acceptCookie = () => {
    prop.cookiesList.map((c) => {
      return (document.cookie = c.name + "=true" + expires + "; path=/");
    });
    initializeAndTrack(window.location);
    setDisplayCookieNotice(false);
  };

  const declineCookie = () => {
    prop.cookiesList.map((c) => {
      if (c.editable)
        return (document.cookie = c.name + "=false" + expires + "; path=/");
      else
        return (document.cookie =
          c.name + "=" + c.default + expires + "; path=/");
    });
    initializeAndTrack(window.location);
    setDisplayCookieNotice(false);
  };

  const validatePreferences = (e) => {
    e.preventDefault();
    prop.cookiesList.forEach((c) => {
      if (document.getElementById(c.name).checked)
        document.cookie = c.name + "=true" + expires + "; path=/";
      else document.cookie = c.name + "=false" + expires + "; path=/";
      initializeAndTrack(window.location);
      setDisplayCookieNotice(false);
    });
  };

  const cookieExist = (name) => {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin === -1) {
      begin = dc.indexOf(prefix);
      if (begin !== 0) return null;
    } else {
      begin += 2;
      var end = document.cookie.indexOf(";", begin);
      if (end !== -1) {
        end = dc.length;
      }
    }
    return decodeURI(dc.substring(begin + prefix.length, end));
  };

  useEffect(() => {
    prop.cookiesList.forEach((c) => {
      if (!cookieExist(c.name)) {
        return setDisplayCookieNotice(true);
      }
    });
  });

  return (
    <>
      {displayCookieNotice && (
        <div className={backgroundWrapper}>
          <Container width="fullbleed" className={containerWrapper}>
            <Section padding={5} className={sectionWrapper}>
              {children}
              {displayCookieList && (
                <form onSubmit={validatePreferences}>
                  <div>
                    {prop.cookiesList.map((c) => {
                      return (
                        <div key={c.name}>
                          <input
                            type="checkbox"
                            defaultChecked={c.default}
                            disabled={!c.editable}
                            value={c.name}
                            id={c.name}
                          />
                          <label htmlFor={c.name}>{c.title}</label>
                          <p>{c.text}</p>
                        </div>
                      );
                    })}
                    <div>
                      <button type={"submit"}>
                        {text.personalizeValidation}
                      </button>
                    </div>
                  </div>
                </form>
              )}
              {!displayCookieList && (
                <FlexList marginY={4} variant="start">
                  {prop.personalizeButton && (
                    <li>
                      <Button
                        variant="reversed"
                        onClick={() => setDisplayCookieList(true)}
                      >
                        {text.personalizeButton}
                      </Button>
                    </li>
                  )}
                  {prop.declineButtonActivated && (
                    <li>
                      <Button variant="reversed" onClick={declineCookie}>
                        {text.declineButton}
                      </Button>
                    </li>
                  )}
                  <li>
                    <Button variant="reversed" onClick={acceptCookie}>
                      {text.acceptButton}
                    </Button>
                  </li>
                </FlexList>
              )}
            </Section>
          </Container>
        </div>
      )}
    </>
  );
};

CookieNotice.defaultProps = {
  acceptButtonText: "Accept",
  declineButton: false,
  declineButtonText: "Decline",
  personalizeButtonText: "Personalise",
  cookies: [
    {
      name: "gatsby-gdpr-google-analytics",
      editable: true,
      default: true,
      title: "Google Analytics",
      text: "Google Analytics is a statistical tool owned by Google which allows us to understand how our audience interacts with our website.",
    },
  ],
  cookieDays: 365,
  personalizeButtonEnable: false,
  personalizeValidationText: "Save",
};

export default CookieNotice;
