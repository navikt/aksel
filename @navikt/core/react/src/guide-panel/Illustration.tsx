import React, { SVGProps } from "react";
import { useId } from "../util/hooks";
import { useI18n } from "../util/i18n/i18n.context";

interface SVGRProps {
  title?: string;
  titleId?: string;
}

export type DefaultIllustrationType = React.FunctionComponent<
  SVGProps<SVGSVGElement> & SVGRProps
>;

export const DefaultIllustration: DefaultIllustrationType = ({
  title,
  titleId: _titleId,
  ...props
}) => {
  const translate = useI18n("GuidePanel");

  let titleId: string | undefined = useId();
  titleId = title ? (_titleId ? _titleId : "title-" + titleId) : undefined;

  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={translate("illustrationLabel")}
      focusable={false}
      role="img"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <g clipPath="url(#clip0_1387_21067)">
        <rect width="80" height="80" rx="40" fill="#E3EFF7" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M55.1888 40.4309C53.795 44.9809 51.0663 48.7578 47.5693 51.0691L47.7484 53.0953L47.7474 53.1777L45.857 69.8798H33.8679L33.8181 69.5289L31.5004 53.149L31.5862 51.1003C28.0715 48.7951 25.3274 45.012 23.9257 40.4499C23.8781 40.4544 23.83 40.4567 23.7812 40.4567C22.8745 40.4567 22.1562 39.6596 22.1562 38.694V33.2299C22.1562 32.5826 22.479 32.0107 22.9648 31.704C23.7229 21.5029 30.8443 13.4856 39.554 13.4856C48.2401 13.4856 55.3472 21.4598 56.1376 31.6212C56.7049 31.8987 57.0938 32.5185 57.0938 33.2299V38.694C57.0938 39.6601 56.3765 40.4567 55.4688 40.4567C55.3731 40.4567 55.2796 40.4479 55.1888 40.4309Z"
          fill="#F5F6F7"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M47.1471 51.6344C47.0789 55.2818 43.7373 59.0238 39.625 59.0238C35.4948 59.0238 32.142 55.2492 32.1022 51.5868C29.9622 52.1324 26.6956 53.778 23.9995 56.528C21.3885 59.191 19.3125 63.194 19.3125 66.2992V85H59.9375V66.2992C59.9375 63.1877 57.8167 59.1779 55.1575 56.5118C52.4983 53.8457 49.3007 52.2224 47.1471 51.6344Z"
          fill="#156389"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M31.9671 51.7135C29.9959 52.4334 26.6891 54.0069 24.1875 56.3965C16.875 54.7596 13.625 50.8701 13.625 50.8701C13.625 50.8701 20.3621 44.2597 20.3662 32.698V32.6858C20.3662 19.1479 27.6319 9.80769 39.6022 9.80769C51.5742 9.80769 58.8399 19.1479 58.8399 32.6858H58.883C58.883 44.2556 65.625 50.8701 65.625 50.8701C65.625 50.8701 62.375 54.7596 55.0625 56.3942L55.0515 56.3965C52.6353 54.1854 49.1309 52.48 47.2243 51.759L47.2265 51.7583L47.1508 50.9013L47.1917 50.8303C50.7891 48.5155 53.5804 44.616 54.9262 39.904C55.0909 39.9962 55.277 40.0481 55.4739 40.0481C56.1476 40.0481 56.6928 39.4432 56.6928 38.694V33.2299C56.6928 32.5888 56.2936 32.0529 55.7564 31.9115C55.7559 31.9041 55.7554 31.8967 55.7549 31.8893C38.7466 33.7984 32.6199 22.0681 32.117 22.0673C32.117 22.0673 26.4686 26.1538 23.769 31.0125C23.769 31.0125 23.3576 31.9297 23.3556 31.9605C22.8934 32.1528 22.5637 32.648 22.5637 33.2299V38.694C22.5637 39.4432 23.1103 40.0481 23.7826 40.0481C23.9316 40.0481 24.0743 40.0185 24.2062 39.9643C25.5668 44.6786 28.3759 48.5739 31.9901 50.8733L32.0035 50.9013L31.9695 51.7135H31.9671Z"
          fill="#A93D70"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M33.8159 35.8563C32.766 35.9417 32.4722 34.2696 32.7885 33.1775C32.848 32.9706 33.1956 32.0283 33.8109 32.0283C34.4254 32.0283 34.6968 32.5433 34.7345 32.6319C35.1865 33.6965 34.9645 35.7622 33.8159 35.8563"
          fill="#202733"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M45.9927 35.8563C47.0425 35.9417 47.3364 34.2696 47.0201 33.1775C46.9606 32.9706 46.613 32.0283 45.9977 32.0283C45.3832 32.0283 45.1118 32.5433 45.0741 32.6319C44.6221 33.6965 44.8441 35.7622 45.9927 35.8563"
          fill="#202733"
        />
        <path
          d="M40.2935 37.5041C40.9213 37.396 41.3501 37.4638 41.5036 37.6748C42.0833 38.4721 41.8979 39.3156 40.9035 40.0081C40.3806 40.372 39.661 40.5001 39.28 40.3114C39.0937 40.2191 38.8758 40.3133 38.7934 40.5218C38.7109 40.7304 38.7951 40.9742 38.9814 41.0665C39.6111 41.3784 40.5794 41.206 41.2931 40.7092C42.6445 39.7682 42.9537 38.3611 42.0758 37.1534C41.7042 36.643 41.0465 36.5389 40.1812 36.688C39.9799 36.7227 39.8418 36.9335 39.8728 37.1589C39.9038 37.3842 40.0921 37.5388 40.2935 37.5041Z"
          fill="#202733"
        />
        <path
          d="M44.8337 42.9837C44.7968 43.0623 44.7122 43.2128 44.5763 43.4111C44.3463 43.7466 44.0574 44.083 43.7066 44.3967C42.6611 45.3315 41.3002 45.8721 39.5683 45.8226C37.8795 45.7744 36.5247 45.2422 35.4626 44.384C35.0726 44.0689 34.7506 43.7315 34.4933 43.3951C34.3415 43.1967 34.2468 43.0464 34.2053 42.968C34.1056 42.7795 33.8606 42.7019 33.6581 42.7946C33.4555 42.8874 33.3721 43.1154 33.4718 43.3039C33.5318 43.4175 33.6487 43.6029 33.8273 43.8364C34.1206 44.2197 34.4852 44.6019 34.9266 44.9585C36.1256 45.9273 37.6579 46.5293 39.5432 46.5831C41.5064 46.6391 43.0759 46.0157 44.273 44.9453C44.6733 44.5875 45.0023 44.2043 45.2656 43.8203C45.4257 43.5868 45.5298 43.4015 45.5829 43.2882C45.6733 43.0956 45.5788 42.8714 45.3719 42.7873C45.165 42.7033 44.924 42.7912 44.8337 42.9837Z"
          fill="#202733"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M53.8629 70.5H42.8865C42.3966 70.5 42 70.0974 42 69.6V63.609C42 63.1117 42.3966 62.7083 42.8865 62.7083H53.8629C54.3527 62.7083 54.75 63.1117 54.75 63.609V69.6C54.75 70.0974 54.3527 70.5 53.8629 70.5"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M49.0346 63.9451H47.8971C47.8128 63.9451 47.7449 63.8775 47.7449 63.7937V63.6029C47.7449 63.5197 47.8128 63.4515 47.8971 63.4515H49.0346C49.1188 63.4515 49.1867 63.5197 49.1867 63.6029V63.7937C49.1867 63.8775 49.1188 63.9451 49.0346 63.9451"
          fill="#202733"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M48.1365 63.7708H48.7955V62H48.1365V63.7708Z"
          fill="#818997"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M52.5417 65.5H51.6457C51.6457 65.5 51.5839 65.5 51.5621 65.5545L51.0662 67.0725L50.5708 65.5545C50.5489 65.5 50.4868 65.5 50.4868 65.5H48.764C48.7267 65.5 48.6954 65.5311 48.6954 65.5682V66.0837C48.6954 65.6748 48.2603 65.5 48.0055 65.5C47.4349 65.5 47.053 65.8758 46.934 66.4472C46.9276 66.0681 46.8961 65.9323 46.794 65.7932C46.7471 65.7251 46.6793 65.6678 46.6055 65.6204C46.4535 65.5314 46.317 65.5 46.0237 65.5H45.6794C45.6794 65.5 45.6171 65.5 45.5952 65.5545L45.2818 66.331V65.5682C45.2818 65.5311 45.2508 65.5 45.2136 65.5H44.4167C44.4167 65.5 44.3552 65.5 44.3328 65.5545L44.0071 66.362C44.0071 66.362 43.9746 66.4427 44.0489 66.4427H44.3552V67.9813C44.3552 68.0195 44.3853 68.0497 44.4236 68.0497H45.2136C45.2508 68.0497 45.2818 68.0195 45.2818 67.9813V66.4427H45.5898C45.7664 66.4427 45.8039 66.4475 45.8726 66.4796C45.914 66.4952 45.9513 66.5268 45.9716 66.5633C46.0133 66.6417 46.0237 66.7359 46.0237 67.0135V67.9813C46.0237 68.0195 46.0544 68.0497 46.0923 68.0497H46.8494C46.8494 68.0497 46.935 68.0497 46.9688 67.9652L47.1366 67.5505C47.3597 67.863 47.7269 68.0497 48.1833 68.0497H48.283C48.283 68.0497 48.3691 68.0497 48.4032 67.9652L48.6954 67.2415V67.9813C48.6954 68.0195 48.7267 68.0497 48.764 68.0497H49.5368C49.5368 68.0497 49.6221 68.0497 49.6564 67.9652C49.6564 67.9652 49.9655 67.1978 49.9667 67.192H49.9671C49.979 67.1281 49.8983 67.1281 49.8983 67.1281H49.6225V65.8113L50.4904 67.9652C50.5243 68.0497 50.6097 68.0497 50.6097 68.0497H51.5228C51.5228 68.0497 51.6087 68.0497 51.6426 67.9652L52.6048 65.5826C52.6381 65.5 52.5417 65.5 52.5417 65.5V65.5ZM48.6954 67.128H48.1763C47.9696 67.128 47.8015 66.9607 47.8015 66.7538C47.8015 66.5473 47.9696 66.3789 48.1763 66.3789H48.3215C48.5276 66.3789 48.6954 66.5473 48.6954 66.7538V67.128Z"
          fill="#C30000"
        />
      </g>
      <defs>
        <clipPath id="clip0_1387_21067">
          <rect width="80" height="80" rx="40" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
