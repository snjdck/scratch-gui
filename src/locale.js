import localeDataEn from 'react-intl/locale-data/en';
import localeDataZh from 'react-intl/locale-data/zh';
import localeDataFr from 'react-intl/locale-data/fr';

import messages from '../locale/messages.json'; // eslint-disable-line import/no-unresolved

export default {
    en: {
        name: 'English',
        localeData: localeDataEn,
        messages: messages.en
    },
    es: {
        name: '简体中文',
        localeData: localeDataZh,
        messages: messages.zh
    },
    fr: {
        name: 'Français',
        localeData: localeDataFr,
        messages: messages.fr
    }
};
