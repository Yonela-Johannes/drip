import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const MoreOption = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div
      className="hidden md:flex w-full items-center justify-end"
    >
    <div className="flex gap-4 right-0 top-0 bottom-0 z-50 bg-pink px-6">
        <Link to="/products">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "7px 0",
            }}
          >
            <span
              style={{
                color: "#000",
              }}
            >
              Shop
            </span>
          </div>
        </Link>

        <Link to="/cart">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "7px 0",
            }}
          >
            <span
              style={{
                color: "#000",
              }}
            >
              Cart
            </span>
          </div>
        </Link>
        {user && user?._id && (
          <>
          <Link to="/wishlist">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "7px 0",
              }}
            >
              <span
                style={{
                  color: "#000",
                }}
              >
                Wishlist
              </span>
            </div>
          </Link>

          <Link to="/orders">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "7px 0",
              }}
            >
              <span
                style={{
                  color: "#000",
                }}
              >
                My orders
              </span>
            </div>
          </Link>

          <Link to="/forgot-password">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "7px 0",
              }}
            >
              <span
                style={{
                  color: "#000",
                }}
              >
                Forgot password
              </span>
            </div>
          </Link>

          <Link to="/profile">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "7px 0",
              }}
            >
              <span
                style={{
                  color: "#000",
                }}
              >
                My profile
              </span>
            </div>
          </Link>
          </>
        )}

        <Link to="/faq">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "7px 0",
            }}
          >
            <span
              style={{
                color: "#000",
              }}
            >
              Faq
            </span>
          </div>
        </Link>

        <Link to="/support">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "7px 0",
            }}
          >
            <span
              style={{
                color: "#000",
              }}
            >
              Report us
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MoreOption;
