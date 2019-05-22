import React from 'react';

import styled from 'styled-components';
import theme from '../theme/styledTheme';
// import HeaderImage from '../assets/chatting.svg';
// import ReceptionStaff from '../assets/staff.svg';

class TermsPage extends React.Component {
  render() {
    return (
        <TermsPageOuter>
          <TermsPageContainer>
            <section className="terms">
              <h2>Terms of Service</h2>
              <p>
                By accessing FrontDesk, you are agreeing to be bound by these terms of service, all applicable laws
                and regulations, and agree that you are responsible for compliance with any applicable local laws. If
                you do not agree with any of these terms, you are prohibited from using or accessing this site. The
                materials contained in this website are protected by applicable copyright and trademark law.
              </p>

              <h3>1. Terminology</h3>
              <p>
                The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice
                and any or all Agreements: "Client", "You" and "Your" refers to you, the person accessing this website
                and accepting the Company's terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers
                to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves, or either the Client
                or ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake
                the process of our assistance to the Client in the most appropriate manner, whether by formal meetings
                of a fixed duration, or any other means, for the express purpose of meeting the Client's needs in respect
                of provision of the Company's stated services/products, in accordance with and subject to, prevailing law
                of . Any use of the above terminology or other words in the singular, plural,
                capitalisation and/or he/she or they, are taken as interchangeable and therefore as referring to same.
              </p>

              <h3>2. Use License</h3>
              <p>
                Unless otherwise stated, FrontDesk and/or it's licensors own the intellectual property rights for
                all material on FrontDesk. All intellectual property rights are reserved. You may view and/or print
                pages from FrontDesk for your own personal use subject to restrictions set in these terms and conditions.
              </p>
              <p>
                You may not reproduce, duplicate, copy, republish, sell, rent, sub-license, or redistribute material
                from FrontDesk (unless content is specifically made for redistribution).
              </p>
              <p>
                This license shall automatically terminate if you violate any of these restrictions and may be
                terminated by FrontDesk at any time. Upon terminating your viewing of these materials or upon the
                termination of this license, you must destroy any downloaded materials in your possession whether in
                electronic or printed format.
              </p>

              <h3>3. Disclaimer</h3>
              <p>
                The materials on FrontDesk's website are provided on an 'as is' basis. FrontDesk makes no warranties,
                expressed or implied, and hereby disclaims and negates all other warranties including, without
                limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or
                non-infringement of intellectual property or other violation of rights.
              </p>
              <p>
                Further, FrontDesk does not warrant or make any representations concerning the accuracy, likely results,
                or reliability of the use of the materials on its website or otherwise relating to such materials or on
                any sites linked to this site.
              </p>

              <h3>4. Cookies</h3>
              <p>
                We employ the use of cookies. By using FrontDesk's website you consent to the use of cookies in
                accordance with FrontDesk's privacy policy.
              </p>
              <p>
                Most of the modern day interactive web sites use cookies to enable us to retrieve user details for each
                visit. Cookies are used in some areas of our site to enable the functionality of this area and ease of
                use for those people visiting. Some of our affiliate / advertising partners may also use cookies.
              </p>

              <h3>5. Accuracy of materials</h3>
              <p>
                The materials appearing on FrontDesk's website could include technical, typographical, or photographic
                errors. FrontDesk does not warrant that any of the materials on its website are accurate, complete or
                current. FrontDesk may make changes to the materials contained on its website at any time without
                notice. However FrontDesk does not make any commitment to update the materials.
              </p>

              <h3>6. Links</h3>
              <p>
                FrontDesk has not reviewed all of the sites linked to its website and is not responsible for the
                contents of any such linked site. The inclusion of any link does not imply endorsement by FrontDesk of
                the site. Use of any such linked website is at the user's own risk.
              </p>

              <h3>7. Modifications</h3>
              <p>
                FrontDesk may revise these terms of service for its website at any time without notice. By using this
                website you are agreeing to be bound by the then current version of these terms of service.
              </p>

              <h3>8. Reservation of Rights</h3>
              <p>
                We reserve the right at any time and in its sole discretion to request that you remove all links or any particular
                link to our Web site. You agree to immediately remove all links to our Web site upon such request. We also
                reserve the right to amend these terms and conditions and its linking policy at any time. By continuing
                to link to our Web site, you agree to be bound to and abide by these linking terms and conditions.
              </p>

              <h3>9. Removal of links from our website</h3>
              <p>
                If you find any link on our Web site or any linked web site objectionable for any reason, you may contact
                us about this. We will consider requests to remove links but will have no obligation to do so or to respond
                directly to you.
              </p>

              <h3>10. Governing Law</h3>
              <p>
                These terms and conditions are governed by and construed in accordance with European Union laws and you
                irrevocably submit to the exclusive jurisdiction of its courts.
              </p>

              <h3>Contact Information</h3>
              <p>If you have any queries regarding any of our terms, please contact us at
                <a href="mailto:webchatlabs@gmail.com"> contact@frontdesk.com</a>.
              </p>
            </section>
          </TermsPageContainer>
        </TermsPageOuter>
    );
  }
}

export default TermsPage;

const TermsPageOuter = styled.div`
  background: ${theme.color.offWhite};
`;

const TermsPageContainer = styled.div`
  background: ${theme.color.white};
  margin: 0 5rem;
  box-shadow: ${theme.shadow.containerShadow};
  
  section {
    width: 60%;
    padding: 2rem;
    @media(max-width: 1000px) {
      width: 100%;
      padding: 2rem 1rem;
    }
    
    h2 {
      font-size: ${theme.fontSize.xl};
      padding: 25px;
      color: ${theme.color.textColor};
    }
    
    h3 {
      font-size: ${theme.fontSize.m};
      color: ${theme.color.accentText};
      padding: 2.5rem 2.5rem 0;
      font-weight: bold;
    }
    
    p {
      font-size: ${theme.fontSize.xs};
      color: ${theme.color.textColor};
      padding: 25px;
    }
    a {
      text-decoration: none;
      color: ${theme.color.accentPurple};
      font-weight: bold;
    }
  }
`;
