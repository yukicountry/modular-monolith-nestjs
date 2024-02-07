import { MyPageTabs } from "../-types";

export const useMyPagePresenter = () => {
  const currentTab = getCurrentTabFromPathName(location.pathname);

  return {
    currentTab,
  };
};

const getCurrentTabFromPathName = (pathName: string) => {
  switch (pathName) {
    case "/mypage/events":
      return MyPageTabs.EventHistories;

    case "/mypage/follows":
      return MyPageTabs.MyFollows;

    case "/mypage/groups":
      return MyPageTabs.MyGroups;

    case "/mypage/account":
      return MyPageTabs.AccountSettings;

    default:
      return MyPageTabs.EventHistories;
  }
};
