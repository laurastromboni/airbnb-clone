import React, { Component } from "react";

import icon1 from "../images/helpicon1.jpg"
import icon2 from "../images/helpicon2.jpg"
import icon3 from "../images/helpicon3.jpg"
import icon4 from "../images/helpicon4.jpg"
import icon5 from "../images/helpicon5.jpg"
import icon6 from "../images/helpicon6.jpg"
import icon7 from "../images/helpicon7.jpg"
import icon8 from "../images/helpicon8.jpg"

import "./style/Help.scss"

class Help extends Component {
  render() {
    return(
      <section className="Help">
        <div className="cover">
          <div className="content-cover">
            <h1>Help</h1>
            <p>Our team is here to help you for everything you need.</p>
            <button>Contact us</button>
          </div>
        </div>

        <div className="top-content">
          <h2>Questions? You’re in the right place.</h2>
          <div className="top-blocs col-lg-12">
          <div className="left-bloc col-lg-6"><a href="https://www.airbnb.com/how-it-works">
              <h4>How it works</h4>
              <p>Discover unique places to stay anywhere in the world.</p>
              </a></div>
            <div className="right-bloc col-lg-6"><a href="https://www.airbnb.com/trust">
              <h4>Trust & Safety</h4>
              <p>Learn about how we help everyone on Airbnb travel and host with confidence.</p>
              </a></div>
          </div>
        </div>

        <hr />

        <div className="col-lg-12 recommanded">
            <h2>Hosting in 3 steps</h2>
            <div className="col-lg-12 step-list">
              <div className="col-lg-4 one-step">
                <h3>Payment methods</h3>
                <p><a href="https://www.airbnb.com/help/article/126/what-methods-of-payment-does-airbnb-accept">What methods of payment does Airbnb accept?</a></p>
                <p><a href="https://www.airbnb.com/help/article/2183/how-do-i-confirm-my-payment-method">How do I confirm my payment method?</a></p>
                <p><a href="https://www.airbnb.com/help/article/795/how-do-i-use-alipay-to-pay">How do I use Alipay to pay?</a></p>
                <p><a href="https://www.airbnb.com/help/topic/1121/payment-methods"><span>Browse all</span></a></p>
              </div>
              <div className="col-lg-4 one-step">
                <h3>Problem with a host or listing</h3>
                <p><a href="https://www.airbnb.com/help/article/251/what-if-a-host-asks-for-more-money">What if a host asks for more money?</a></p>
                <p><a href="https://www.airbnb.com/help/article/100/where-can-i-find-check-in-information-for-my-trip">Where can I find check-in information for my trip?</a></p>
                <p><a href="https://www.airbnb.com/help/article/88/what-should-i-do-if-i-can-t-get-in-touch-with-my-host">What should I do if I can't get in touch with my host?</a></p>
                <p><a href="https://www.airbnb.com/help/topic/1126/problem-with-a-host-or-listing"><span>Browse all</span></a></p>
                </div>
              <div className="col-lg-4 one-step">
                <h3>Coupons & credits</h3>
                <p><a href="https://www.airbnb.com/help/article/160/how-do-i-use-a-coupon-code">How do I use a coupon code?</a></p>
                <p><a href="https://www.airbnb.com/help/article/1352/my-coupon-code-isn-t-working">My coupon code isn’t working</a></p>
                <p><a href="https://www.airbnb.com/help/article/84/how-do-i-earn-credit-from-referring-a-friend-to-airbnb">How do I earn credit from referring a friend to Airbnb?</a></p>
                <p><a href="https://www.airbnb.com/help/topic/1122/coupons---credits"><span>Browse all</span></a></p>    
              </div>
            </div>
          </div>

        <hr />

        <div className="col-lg-12 topics">
            <h2>All topics</h2>
            <div className="col-lg-12 step-list">
              <div className="col-lg-3 one-step">
                <img src={icon1} alt="topic" />
                <h3>Getting started</h3>
                <p><a href="https://www.airbnb.com/help/topic/1095/finding-a-place-to-stay">Finding a place to stay</a></p>
                <p><a href="https://www.airbnb.com/help/topic/1128/traveling-safely">Traveling safely</a></p>
              </div>
              <div className="col-lg-3 one-step">
                <img src={icon2} alt="topic" />
                <h3>Booking</h3>
                <p><a href="https://www.airbnb.com/help/topic/1105/booking-a-home">Booking a home</a></p>
                <p><a href="https://www.airbnb.com/help/topic/1109/booking-requirements">Booking requirements</a></p>
                <p><a href="https://www.airbnb.com/help/topic/1112/identification---verifications">Identification & verifications</a></p>
                <p><a href="https://www.airbnb.com/help/topic/1113/booking---paying">Booking & paying</a></p>
                <p><a href="https://www.airbnb.com/help/topic/1117/pre-approvals---special-offers">Pre-approvals & special offers</a></p>
              </div>
              <div className="col-lg-3 one-step">
                <img src={icon3} alt="topic" />
                <h3>Payment</h3>
                <p><a href="https://www.airbnb.com/help/topic/1119/paying-for-your-reservation">Paying for your reservation</a></p>
                <p><a href="https://www.airbnb.com/help/topic/1120/pricing---fees">Pricing & fees</a></p>
                <p><a href="https://www.airbnb.com/help/topic/1121/payment-methods">Payment methods</a></p>
                <p><a href="https://www.airbnb.com/help/topic/1143/security-deposits">Security deposits</a></p>
                <p><a href="https://www.airbnb.com/help/topic/1122/coupons---credits">Coupons & credits</a></p>
              </div>
              <div className="col-lg-3 one-step">
                <img src={icon4} alt="topic" />
                <h3>Your trips</h3>
                <p><a href="https://www.airbnb.com/help/topic/1124/help-with-your-trip">Help with your trip</a></p>
                <p><a href="https://www.airbnb.com/help/topic/1127/experience-questions">Experience questions</a></p>
                <p><a href="https://www.airbnb.com/help/topic/1131/long-term-reservations">Long-term reservations</a></p>
                <p><a href="https://www.airbnb.com/help/topic/1132/host-cancellations">Host cancellations</a></p>
                <p><a href="https://www.airbnb.com/help/topic/1133/changing-a-reservation">Changing a reservation</a></p>
                <p><a href="https://www.airbnb.com/help/topic/1134/canceling-a-reservation">Canceling a reservation</a></p>
              </div>
              <div className="col-lg-3 one-step">
                <img src={icon5} alt="topic" />
                <h3>Your account</h3>
                <p><a href="https://www.airbnb.com/help/topic/1145/your-profile">Your profile</a></p>
                <p><a href="https://www.airbnb.com/help/topic/1146/account-security">Account security</a></p>
                <p><a href="https://www.airbnb.com/help/topic/1137/reviews">Reviews</a></p>
              </div>
              <div className="col-lg-3 one-step">
                <img src={icon6} alt="topic" />
                <h3>Become a host</h3>
                <p><a href="https://www.airbnb.com/help/topic/1152/becoming-a-homes-host">Becoming a homes host</a></p>
              </div>
              <div className="col-lg-3 one-step">
                <img src={icon7} alt="topic" />
                <h3>Business travel </h3>
                <p><a href="https://www.airbnb.com/help/topic/1101/for-business-travelers">For business travelers</a></p>
                <p><a href="https://www.airbnb.com/help/topic/1102/for-bookers-using-airbnb-for-work">For bookers using Airbnb for Work</a></p>
                <p><a href="https://www.airbnb.com/help/topic/1103/for-admins-using-airbnb-for-work">For admins using Airbnb for Work</a></p>
              </div>
              <div className="col-lg-3 one-step">
                <img src={icon8} alt="topic" />
                <h3>Partners & community</h3>
                <p><a href="https://www.airbnb.com/help/topic/1149/airbnb-community">Airbnb community</a></p>
                <p><a href="https://www.airbnb.com/help/topic/1155/neighbors">Neighbors</a></p>
                <p><a href="https://www.airbnb.com/help/topic/1156/photographers---service-providers">Photographers & service providers</a></p>
              </div>

            </div>
          </div>

      <div className="endcover"></div>

      </section>
    )
  }
}

export default Help;