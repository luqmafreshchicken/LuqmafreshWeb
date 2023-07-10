import * as React from "react";
import "./whysection.css";
import Header from "../../component/header/Header";
import { useEffect } from "react";

export default function WhySection() {

  useEffect(()=>(
    window.scrollTo(0, 0)
  ))
  return (
    <div>
      <Header />
      <div className="why_section_heading">
      <h3>Why Luqmafresh</h3>
      </div>
      <div className="why_section_banner">
        <img src="about-new.jpg" />
      </div>
      <div className="why_section_container">
        {/* section1 */}

        <div className="why_section_content">
          <div className="why_section_text">
            <h3>ABOUT LUQMAFRESH</h3>
            <h6>Understanding the Concept of Nutritious Meat</h6>
            <p>
              The increasing focus on leading a healthy lifestyle has sparked a
              shift in people's choices, leading to a higher demand for natural
              and organic ingredients. It is now widely recognized that meat and
              poultry offer valuable nutritional benefits. When it comes to
              ensuring the elimination of blood toxicity, the Zabiha Halal
              method, which involves the ritualistic slaughter of animals for
              meat, has proven to be highly effective.
            </p>
            <p>
              The earliest documented instance of this ritualistic slaughter can
              be found in Judaism's oral Torah, where animals were sacrificed by
              precisely severing the trachea, carotid arteries, jugular veins,
              and esophagus with an exceptionally sharp knife, allowing the
              blood to drain from the body. The scientific basis supporting this
              method has only recently come to light, leading to a growing
              number of abattoirs worldwide adopting this approach to obtain
              healthier meat options.
            </p>
          </div>
          <div className="why_section_image">
            <img src="whyImage1.png" />
          </div>
        </div>
        {/* end section1 */}

        {/* section2 */}

        <div className="why_section_content">
          <div className="why_section_image">
            <img src="whyImage2.png" />
          </div>
          <div className="why_section_text">
            <h3>OUR MISSION & VISSION</h3>
            <h6>
              Consumer-Centric Commitment: Upholding Health, Hygiene, and
              Nourishment
            </h6>
            <p>
              At the core of our philosophy lies the belief that every endeavor
              should be geared towards benefiting the consumer. In line with
              this principle, we proudly deliver a range of wholesome and
              hygienic products, be it meat and poultry or any other food items.
              We consider it our duty to provide our customers with food that is
              not only Our Vision and Mission - nourishing but also meets the
              highest standards of quality and production.
            </p>
            <p>
              To ensure this, all our products adhere strictly to international
              benchmarks encompassing aspects such as quality, health,
              production, maintenance, packaging, and retailing. By upholding
              these comprehensive standards, we uphold our commitment to
              offering consumers nothing short of excellence in every bite.
            </p>
          </div>
        </div>
        {/* end section2 */}
        {/* section3 */}

        <div className="why_section_content">
          <div className="why_section_text">
            <h3>OUR HISTORY</h3>
            <h6>Unveiling the Historical Journey</h6>
            <p>
              Luqmafresh Middle East strong belief in meeting the high demand
              for fresh, hygienic, halal, and nutritious meat in the Middle East
              and Gulf regions. To fulfill this commitment, we import
              premium-quality beef, mutton, and chicken that undergo the Zabiha
              halal method of preparation and processing. Through extensive
              laboratory tests comparing various brands, we have discovered that
              this method not only ensures the safety of the meat but also
              guarantees a significantly higher nutritional value compared to
              meat processed through alternative methods.
            </p>
          </div>
          <div className="why_section_image">
            <img src="whyImage3.png" />
          </div>
        </div>
        {/* end section3 */}
        {/* section4 */}

        <div className="why_section_content">
          <div className="why_section_image">
            <img src="whyImage2.png" />
          </div>
          <div className="why_section_text">
            <h3>ABOUT LUQMAFRESH</h3>
            <h6>Understanding the Concept of Nutritious Meat</h6>
            <p>
              The increasing focus on leading a healthy lifestyle has sparked a
              shift in people's choices, leading to a higher demand for natural
              and organic ingredients. It is now widely recognized that meat and
              poultry offer valuable nutritional benefits. When it comes to
              ensuring the elimination of blood toxicity, the Zabiha Halal
              method, which involves the ritualistic slaughter of animals for
              meat, has proven to be highly effective.
            </p>
            <p>
              The earliest documented instance of this ritualistic slaughter can
              be found in Judaism's oral Torah, where animals were sacrificed by
              precisely severing the trachea, carotid arteries, jugular veins,
              and esophagus with an exceptionally sharp knife, allowing the
              blood to drain from the body. The scientific basis supporting this
              method has only recently come to light, leading to a growing
              number of abattoirs worldwide adopting this approach to obtain
              healthier meat options.
            </p>
          </div>
        </div>
        {/* end section4 */}
      </div>
    </div>
  );
}
