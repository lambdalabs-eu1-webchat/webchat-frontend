import React from 'react';
import styled from 'styled-components';
import theme from '../theme/styledTheme';

class PrivacyPage extends React.Component {
  render() {
    return (
        <PrivacyPageOuter>
          <PrivacyPageContainer>
            <section>
              <h2>Privacy Policy</h2>
              <p>
                Your privacy is important to us. It is FrontDesk's policy to respect your privacy regarding any
                information we may collect from you across our website, and other sites we own and operate.
              </p>
              <p>
                We only ask for personal information when we truly need it to provide a service to you. We collect it by
                fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and
                how it will be used.
              </p>
              <p>
                We only retain collected information for as long as necessary to provide you with your requested service.
                What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as
                well as unauthorised access, disclosure, copying, use or modification.
              </p>
              <p>
                We don’t share any personally identifying information publicly or with third-parties, except when
                required to by law.
              </p>
              <p>
                Our website may link to external sites that are not operated by us. Please be aware that we have no
                control over the content and practices of these sites, and cannot accept responsibility or liability
                for their respective privacy policies.
              </p>
              <p>
                You are free to refuse our request for your personal information, with the understanding that we may
                be unable to provide you with some of your desired services.
              </p>
              <p>
                Your continued use of our website will be regarded as acceptance of our practices around privacy and
                personal information. If you have any questions about how we handle user data and personal information,
                feel free to contact us.
              </p>
              <p>
                This policy is effective as of 22 May 2019.
              </p>
            </section>
          </PrivacyPageContainer>
        </PrivacyPageOuter>
    );
  }
}

export default PrivacyPage;

const PrivacyPageOuter = styled.div`
  background: ${theme.color.offWhite};
`;

const PrivacyPageContainer = styled.div`
  background: ${theme.color.white};
  margin: 0 5rem;
  box-shadow: ${theme.shadow.containerShadow};
  padding-bottom: 9rem;
  
  section {
    width: 60%;
    padding: 2rem;
    @media(max-width: 1000px) {
      width: 100%;
      padding: 2rem 1rem;
    }
    
    h2 {
      font-size: ${theme.fontSize.xl};
      color: ${theme.color.textColor};
      padding: 25px;
    }
    
    p {
      font-size: ${theme.fontSize.xs};
      color: ${theme.color.textColor};
      padding: 0 2.5rem 2.5rem 2.5rem ;
    }
  
    a {
      text-decoration: none;
      color: ${theme.color.accentPurple};
      font-weight: bold;
    }
  }
`;
