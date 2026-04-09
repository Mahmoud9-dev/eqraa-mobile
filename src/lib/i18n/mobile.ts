import type { Language } from './types';

export interface MobileTranslations {
  more: string;
  back: string;
  pullToRefresh: string;
  swipeToDelete: string;
  tapToView: string;
}

export const mobile: Record<Language, MobileTranslations> = {
  ar: {
    more: 'المزيد',
    back: 'رجوع',
    pullToRefresh: 'اسحب للتحديث',
    swipeToDelete: 'اسحب للحذف',
    tapToView: 'اضغط للعرض',
  },
  en: {
    more: 'More',
    back: 'Back',
    pullToRefresh: 'Pull to refresh',
    swipeToDelete: 'Swipe to delete',
    tapToView: 'Tap to view',
  },
};
