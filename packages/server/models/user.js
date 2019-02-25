const mongoose = require('mongoose');
const Plugin = require('./plugin');

const { Schema } = mongoose;

const UserSchema = new Schema({
  // 登录信息
  email: { type: String, required: true },
  password: { type: String, required: true },

  // 用户信息
  nickname: { type: String, required: true },
  avatar: { type: String, default: 'http://image.mintsweet.cn/avatar.jpeg' },
  location: { type: String, default: '' },
  signature: { type: String, default: '' },

  // 积分
  score: { type: Number, default: 0 },

  // 星标用户 - 预留
  star: { type: Boolean, default: false },
  // 封号 - 管理员行为
  lock: { type: Boolean, default: false },
  // 状态 - 激活行为
  active: { type: Boolean, default: false },

  // 统计
  topic_count: { type: Number, default: 0 }, // 累计发布话题数
  like_count: { type: Number, default: 0 }, // 累计话题被喜欢数
  collect_count: { type: Number, default: 0 }, // 累计话题被收藏数
  follower_count: { type: Number, default: 0 }, // 累计粉丝数
  following_count: { type: Number, default: 0 }, // 累计关注数

  // 管理员等级
  role: { type: Number, default: 0 },

  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },

  // 注销账户 - 用户主动行为
  delete: { type: Boolean, default: false }
});

UserSchema.plugin(Plugin);

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ score: -1 });
UserSchema.index({ create_at: -1 });

UserSchema.pre('save', function(next) {
  this.update_at = new Date();
  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
