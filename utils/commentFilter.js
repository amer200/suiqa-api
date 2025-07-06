const leoProfanity = require('leo-profanity');

const customBadWords = [
    'خول', 'منيوك', 'عرص', 'كسمك', 'شرموط', 'قحبى', 'متناك',
    'قحبة', 'ابوك', 'يا ابن', 'نيك', 'زبي', 'زبك', 'ممحون', 'قذر',
    'وسخ', 'وسخه', 'فاجر', 'خنيث', 'معرص', 'كلب', 'خرا', 'عاهر', 'يلعن'
];

leoProfanity.add(customBadWords);

function isCommentClean(comment) {
    return !leoProfanity.check(comment);
}

module.exports = {
    isCommentClean
};