"use client";

import React, { useEffect } from "react";
import styles from "./Modal.module.scss";
import moment from "moment-jalaali"; // If you need date formatting
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";

interface ModalProps {
  coin: {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    last_updated: string;
  };
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ coin, onClose }) => {
  useEffect(() => {
    // Handle Escape key
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  function toShamsiDate(isoDate: string) {
    return moment(isoDate).format("jYYYY/jMM/jDD");
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={`${styles.modal} bg-cream`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h2 className="montserrat text-green fw-bolder fs-4 ms-4">
            7<span className="text-blue">currencies</span>.
          </h2>
          <button
            style={{ width: "38px", height: "38px", zIndex: "10000" }}
            className={`d-flex border  border-sky-blue bg-transparent rounded-circle justify-content-center align-items-center z-5`}
            onClick={onClose}
          >
            <RxCross2 className=" text-blue  fs-4 " />
          </button>
        </div>
        <div className="px-4 w-100 mt-sm-6">
          <div className="d-flex align-items-center w-100">
            <div className="d-flex modal-img ">
              <Image
                src={coin.image}
                alt={coin.name}
                width={64}
                height={64}
                className="w-100 h-100 rounded-circle"
              />
            </div>
            <div className="fs-5 ms-3 d-flex align-items-center w-auto flex-grow-1 ">
              <span className="fw-normal me-1">{coin.name}</span>
              <span className="text-steel-gray fw-bold">
                {coin.symbol.toUpperCase()}
              </span>
              <span className="fw-semibold fs-6 ms-auto text-gray d-none d-sm-inline">
                Updated: {toShamsiDate(coin.last_updated)}
              </span>
            </div>
          </div>
          <h2 className="mt-3 fw-bold">
            {coin.current_price.toLocaleString()}{" "}
            <span className="text-green">USD</span>
          </h2>
        </div>
        <div className="w-100 d-flex justify-content-end d-sm-none">
          <span className="fw-semibold fs-6 ms-auto text-gray mt-7 ms-auto">
            Updated: {toShamsiDate(coin.last_updated)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Modal;
