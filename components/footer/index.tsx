import cNames from "classnames";
import { FC } from "react";
import styles from "./styles.module.scss";
import publicLogo from "@/public/public_logo.png";
import Image from "next/image";

interface ILink {
  label: string;
  link?: string;
}
interface ILinkList {
  title: string;
  list: ILink[];
}
interface IQRCode {
  image: string;
  text: string;
}
export interface IFooterProps {
  title: string;
  linkList: ILinkList[];
  qrCode: IQRCode;
  copyRight: string;
  siteNumber: string;
  publicNumber: string;
}

export const Footer: FC<IFooterProps> = ({
  title,
  linkList,
  qrCode,
  copyRight,
  siteNumber,
  publicNumber,
}) => {
  return (
    <div className={styles.footer}>
      <div className={styles.topArea}>
        <h1 className={styles.footerTitle}>{title}</h1>
        <div className={styles.linkListArea}>
          {linkList?.map((item, index) => {
            return (
              <div className={styles.linkArea} key={`linkArea${index}`}>
                <span>{item.title}</span>
                <div className={styles.link}>
                  {item.list?.map((_item, _index) => {
                    return (
                      <div
                        className={cNames({
                          [styles.link]: _item.link,
                          [styles.disabled]: !_item.link,
                        })}
                        onClick={(): void => {
                          _item.link &&
                            window.open(
                              _item.link,
                              "blank",
                              "noopener=yes, noreferrer=yes"
                            );
                        }}
                        key={`link${index}`}
                      >
                        {_item.label}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.bottomArea}>
        <div className={styles.codeArea}>
          <div>
            <Image
              src={qrCode?.image}
              alt={qrCode?.text}
              width={56}
              height={56}
            ></Image>
          </div>
          <div className={styles.text}>{qrCode?.text}</div>
        </div>
        <div className={styles.numArea}>
          <span>{copyRight}</span>
          <span>{siteNumber}</span>
          <div className={styles.publicLogo}>
            <div className={styles.logo}>
              <Image
                src={publicLogo}
                alt={publicNumber}
                width={20}
                height={20}
              ></Image>
            </div>
            <span>{publicNumber}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
