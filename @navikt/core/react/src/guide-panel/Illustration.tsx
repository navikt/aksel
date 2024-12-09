import React from "react";
import { useI18n } from "../util/i18n/i18n.context";

export const DefaultIllustration = () => {
  const translate = useI18n("GuidePanel");

  return (
    <svg
      width="56"
      height="85"
      viewBox="0 0 56 85"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={translate("illustrationLabel")}
      focusable={false}
      role="img"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M43.1888 40.4308C41.795 44.9808 39.0663 48.7576 35.5693 51.069L35.7484 53.0952L35.7474 53.1777L33.857 69.8797H21.8679L21.8181 69.5289L19.5004 53.1489L19.5862 51.1002C16.0715 48.795 13.3274 45.0119 11.9257 40.4499C11.8781 40.4544 11.83 40.4566 11.7812 40.4566C10.8745 40.4566 10.1562 39.6595 10.1562 38.6939V33.2298C10.1562 32.5825 10.479 32.0106 10.9648 31.7039C11.7229 21.5028 18.8443 13.4855 27.554 13.4855C36.2401 13.4855 43.3472 21.4596 44.1376 31.6211C44.7049 31.8986 45.0937 32.5184 45.0937 33.2298V38.6939C45.0937 39.66 44.3765 40.4566 43.4687 40.4566C43.3731 40.4566 43.2796 40.4478 43.1888 40.4308Z"
        fill="#F7F7F7"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M35.1471 51.6345C35.0789 55.2819 31.7373 59.0239 27.625 59.0239C23.4949 59.0239 20.142 55.2493 20.1022 51.5869C17.9622 52.1325 14.6956 53.7781 11.9995 56.5281C9.38852 59.1912 7.3125 63.1941 7.3125 66.2993V85.0001H47.9375V66.2993C47.9375 63.1878 45.8167 59.178 43.1575 56.5119C40.4983 53.8458 37.3007 52.2225 35.1471 51.6345Z"
        fill="#005B82"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.9671 51.7134C17.9959 52.4333 14.6891 54.0068 12.1875 56.3964C4.875 54.7595 1.625 50.87 1.625 50.87C1.625 50.87 8.36213 44.2596 8.3662 32.698V32.6857C8.3662 19.1478 15.6319 9.80762 27.6022 9.80762C39.5742 9.80762 46.8399 19.1478 46.8399 32.6857H46.883C46.883 44.2555 53.625 50.87 53.625 50.87C53.625 50.87 50.375 54.7595 43.0625 56.3942L43.0515 56.3964C40.6353 54.1853 37.1309 52.4799 35.2243 51.7589L35.2265 51.7582L35.1508 50.9012L35.1917 50.8302C38.7891 48.5155 41.5804 44.6159 42.9262 39.904C43.0909 39.9961 43.277 40.048 43.4739 40.048C44.1476 40.048 44.6928 39.4431 44.6928 38.6939V33.2298C44.6928 32.5887 44.2936 32.0528 43.7564 31.9114C43.7559 31.904 43.7554 31.8966 43.7549 31.8892C26.7466 33.7984 20.6199 22.068 20.117 22.0672C20.117 22.0672 14.4686 26.1538 11.769 31.0124C11.769 31.0124 11.3576 31.9296 11.3556 31.9605C10.8934 32.1527 10.5637 32.648 10.5637 33.2298V38.6939C10.5637 39.4431 11.1103 40.048 11.7826 40.048C11.9316 40.048 12.0743 40.0184 12.2062 39.9642C13.5668 44.6785 16.3759 48.5738 19.9901 50.8732L20.0035 50.9012L19.9695 51.7134H19.9671Z"
        fill="#F25C5C"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.8159 35.8563C20.766 35.9417 20.4722 34.2696 20.7885 33.1776C20.848 32.9706 21.1956 32.0283 21.8109 32.0283C22.4254 32.0283 22.6968 32.5434 22.7345 32.632C23.1865 33.6965 22.9645 35.7622 21.8159 35.8563"
        fill="#262626"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M33.9927 35.8563C35.0425 35.9417 35.3364 34.2696 35.0201 33.1776C34.9606 32.9706 34.613 32.0283 33.9977 32.0283C33.3832 32.0283 33.1118 32.5434 33.0741 32.632C32.6221 33.6965 32.8441 35.7622 33.9927 35.8563"
        fill="#262626"
      />
      <path
        d="M28.2935 37.5041C28.9213 37.396 29.3501 37.4638 29.5036 37.6748C30.0833 38.4721 29.8979 39.3156 28.9035 40.0081C28.3806 40.372 27.661 40.5001 27.28 40.3114C27.0937 40.2191 26.8758 40.3133 26.7934 40.5218C26.7109 40.7304 26.7951 40.9742 26.9814 41.0665C27.6111 41.3784 28.5794 41.206 29.2931 40.7092C30.6445 39.7682 30.9537 38.3611 30.0758 37.1534C29.7042 36.643 29.0465 36.5389 28.1812 36.688C27.9799 36.7227 27.8418 36.9335 27.8728 37.1589C27.9038 37.3842 28.0921 37.5388 28.2935 37.5041Z"
        fill="#262626"
      />
      <path
        d="M32.8337 42.9837C32.7968 43.0623 32.7122 43.2128 32.5763 43.411C32.3463 43.7465 32.0574 44.0829 31.7066 44.3966C30.6611 45.3314 29.3002 45.872 27.5683 45.8225C25.8795 45.7743 24.5247 45.2421 23.4626 44.3839C23.0726 44.0688 22.7506 43.7314 22.4933 43.395C22.3415 43.1967 22.2468 43.0463 22.2053 42.9679C22.1056 42.7794 21.8606 42.7018 21.6581 42.7946C21.4555 42.8873 21.3721 43.1153 21.4718 43.3039C21.5318 43.4174 21.6487 43.6029 21.8273 43.8363C22.1206 44.2196 22.4852 44.6018 22.9266 44.9584C24.1256 45.9272 25.6579 46.5292 27.5432 46.583C29.5064 46.6391 31.0759 46.0156 32.273 44.9453C32.6733 44.5874 33.0023 44.2042 33.2656 43.8202C33.4257 43.5867 33.5298 43.4014 33.5829 43.2881C33.6733 43.0955 33.5788 42.8713 33.3719 42.7872C33.165 42.7032 32.924 42.7911 32.8337 42.9837Z"
        fill="#262626"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M41.8629 70.5H30.8865C30.3966 70.5 30 70.0974 30 69.6001V63.609C30 63.1117 30.3966 62.7084 30.8865 62.7084H41.8629C42.3527 62.7084 42.75 63.1117 42.75 63.609V69.6001C42.75 70.0974 42.3527 70.5 41.8629 70.5"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M37.0345 63.9451H35.8971C35.8128 63.9451 35.7449 63.8775 35.7449 63.7937V63.6029C35.7449 63.5197 35.8128 63.4515 35.8971 63.4515H37.0345C37.1188 63.4515 37.1867 63.5197 37.1867 63.6029V63.7937C37.1867 63.8775 37.1188 63.9451 37.0345 63.9451"
        fill="#262626"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M36.1365 63.7708H36.7955V62H36.1365V63.7708Z"
        fill="#8F8F8F"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M40.5417 65.5H39.6457C39.6457 65.5 39.5839 65.5 39.5621 65.5545L39.0662 67.0725L38.5708 65.5545C38.5489 65.5 38.4868 65.5 38.4868 65.5H36.764C36.7267 65.5 36.6954 65.5311 36.6954 65.5682V66.0837C36.6954 65.6748 36.2603 65.5 36.0055 65.5C35.4349 65.5 35.053 65.8758 34.934 66.4472C34.9276 66.0681 34.8961 65.9323 34.794 65.7932C34.7471 65.7251 34.6793 65.6678 34.6055 65.6204C34.4535 65.5314 34.317 65.5 34.0237 65.5H33.6794C33.6794 65.5 33.6171 65.5 33.5952 65.5545L33.2818 66.331V65.5682C33.2818 65.5311 33.2508 65.5 33.2136 65.5H32.4167C32.4167 65.5 32.3552 65.5 32.3328 65.5545L32.0071 66.362C32.0071 66.362 31.9746 66.4427 32.0489 66.4427H32.3552V67.9813C32.3552 68.0195 32.3853 68.0497 32.4236 68.0497H33.2136C33.2508 68.0497 33.2818 68.0195 33.2818 67.9813V66.4427H33.5898C33.7664 66.4427 33.8039 66.4475 33.8726 66.4796C33.914 66.4952 33.9513 66.5268 33.9716 66.5633C34.0133 66.6417 34.0237 66.7359 34.0237 67.0135V67.9813C34.0237 68.0195 34.0544 68.0497 34.0923 68.0497H34.8494C34.8494 68.0497 34.935 68.0497 34.9688 67.9652L35.1366 67.5505C35.3597 67.863 35.7269 68.0497 36.1833 68.0497H36.283C36.283 68.0497 36.3691 68.0497 36.4032 67.9652L36.6954 67.2415V67.9813C36.6954 68.0195 36.7267 68.0497 36.764 68.0497H37.5368C37.5368 68.0497 37.6221 68.0497 37.6564 67.9652C37.6564 67.9652 37.9655 67.1978 37.9667 67.192H37.9671C37.979 67.1281 37.8983 67.1281 37.8983 67.1281H37.6225V65.8113L38.4904 67.9652C38.5243 68.0497 38.6097 68.0497 38.6097 68.0497H39.5228C39.5228 68.0497 39.6087 68.0497 39.6426 67.9652L40.6048 65.5826C40.6381 65.5 40.5417 65.5 40.5417 65.5V65.5ZM36.6954 67.128H36.1763C35.9696 67.128 35.8015 66.9607 35.8015 66.7538C35.8015 66.5473 35.9696 66.3789 36.1763 66.3789H36.3215C36.5276 66.3789 36.6954 66.5473 36.6954 66.7538V67.128Z"
        fill="#C30000"
      />
    </svg>
  );
};
