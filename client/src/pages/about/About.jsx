import React from "react";
import "./About.css";
import MaxWidthWrapper from "../../components/MaxWidthWrapper";
import about from "../../assets/40.png";
const About = () => {
  return (
    <MaxWidthWrapper>
      <div
        className="my-10 pt-20 md:mt-10"
        style={{
          margin: "0px auto",
        }}
      >
        <div className="about__page flex flex-col items-center justify-center">
          {/* 1st verse */}
          <div className="flex flex-col md:flex-row gap-8">
            <div className="">
              <img className="md:w-[500px]" src={about} />
            </div>
            <div className="col__2">
              <div className="meta">
                <p
                  className="text-pink"
                  data-aos="fade-up"
                  style={{
                    fontSize: "40px",
                    fontWeight: "700",
                    lineHeight: "1.2",
                  }}
                >
                  Welcome to Be Pleasured by Pinky
                </p>
                <p data-aos="fade-up">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate id est laborum.
                </p>
                <p data-aos="fade-up">
                  lus ferri velit sanctus cu, sed at soleat accusata. Dictas
                  prompta et Ut placerat legendos interpre.Donec vitae sapien ut
                  libero venenatis faucibus. Nullam quis ante Etiam sit amet
                  orci eget. Quis commodo odio aenean sed adipiscing. Turpis
                </p>
              </div>
            </div>
          </div>

          {/* 2nd verse */}
          <div className="second">
            <div className="heading">
              <h2>What We Provide?</h2>
            </div>
            <div className="row flex">
              <div className="col__3" data-aos="fade-up">
                <div
                  style={{
                    padding: "10px",
                    border: "1px solid rgb(0 0 0 / 14%)",
                    minHeight: "230px",
                  }}
                >
                  <span>Best Prices & Offers</span>
                  <p>
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form
                  </p>
                </div>
              </div>
              <div className="col__3" data-aos="fade-up">
                <div
                  style={{
                    padding: "10px",
                    border: "1px solid rgb(0 0 0 / 14%)",
                    minHeight: "230px",
                  }}
                >
                  <span>Best For Trust & Quality</span>
                  <p>
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form
                  </p>
                </div>
              </div>
              <div className="col__3" data-aos="fade-up">
                <div
                  style={{
                    padding: "15px",
                    border: "1px solid rgb(0 0 0 / 14%)",
                    minHeight: "230px",
                  }}
                >
                  <span>Fast Delivery System</span>
                  <p>
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form
                  </p>
                </div>
              </div>

              <div className="col__3" data-aos="fade-up">
                <div
                  style={{
                    padding: "15px",
                    border: "1px solid rgb(0 0 0 / 14%)",
                    minHeight: "230px",
                  }}
                >
                  <span>Easy Returns Service</span>
                  <p>
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form
                  </p>
                </div>
              </div>

              <div className="col__3" data-aos="fade-up">
                <div
                  style={{
                    padding: "15px",
                    border: "1px solid rgb(0 0 0 / 14%)",
                    minHeight: "230px",
                  }}
                >
                  <span>100% satisfication</span>
                  <p>
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form
                  </p>
                </div>
              </div>

              <div className="col__3" data-aos="fade-up">
                <div
                  style={{
                    padding: "15px",
                    border: "1px solid rgb(0 0 0 / 14%)",
                    minHeight: "230px",
                  }}
                >
                  <span>Great Daily Deal</span>
                  <p>
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default About;
