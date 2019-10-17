"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var Subscription = {
  comment: {
    subscribe: function subscribe(parent, _ref, _ref2, info) {
      var postId = _ref.postId;
      var prisma = _ref2.prisma;
      return prisma.subscription.comment({
        where: {
          node: {
            post: {
              id: postId
            }
          }
        }
      }, info);
    }
  },
  post: {
    subscribe: function subscribe(parent, _ref3, _ref4, info) {
      var postId = _ref3.postId;
      var prisma = _ref4.prisma;
      return prisma.subscription.post({
        where: {
          node: {
            published: true
          }
        }
      }, info);
    }
  }
};
var _default = Subscription;
exports["default"] = _default;