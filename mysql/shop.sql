/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80021
 Source Host           : localhost:3306
 Source Schema         : shop

 Target Server Type    : MySQL
 Target Server Version : 80021
 File Encoding         : 65001

 Date: 18/06/2021 09:32:02
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `user_id` int(0) NOT NULL,
  `province` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `city` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `region` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  `updata_time` datetime(0) NULL DEFAULT NULL,
  `phone` bigint(0) NULL DEFAULT NULL,
  `fname` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of address
-- ----------------------------
INSERT INTO `address` VALUES (1, 1, '江西省', '吉安市', '吉州区', '斗罗大陆', '2021-06-08 16:30:12', NULL, 17879681696, '许永健');

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  `update_time` datetime(0) NULL DEFAULT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, 'e10adc3949ba59abbe56e057f20f883e', '0', '2021-05-30 01:31:54', NULL, '1942049754@qq.com');
INSERT INTO `admin` VALUES (2, 'e10adc3949ba59abbe56e057f20f883e', '0', '2021-05-30 01:30:27', NULL, '1063079106@qq.com');
INSERT INTO `admin` VALUES (3, 'e10adc3949ba59abbe56e057f20f883e', '0', '2021-05-30 12:04:00', NULL, '2904672234@qq.com');

-- ----------------------------
-- Table structure for buyform
-- ----------------------------
DROP TABLE IF EXISTS `buyform`;
CREATE TABLE `buyform`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `user_id` int(0) NOT NULL,
  `address_id` int(0) NULL DEFAULT NULL,
  `product_id` int(0) NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  `update_time` datetime(0) NULL DEFAULT NULL,
  `amount` int(0) NULL DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `status` enum('已收货','未收货') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '未收货',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `address_id`(`address_id`) USING BTREE,
  INDEX `product_id`(`product_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 78 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of buyform
-- ----------------------------
INSERT INTO `buyform` VALUES (53, 1, 1, 26, '2021-06-16 16:30:32', NULL, 2, 'aaa', '已收货');
INSERT INTO `buyform` VALUES (67, 1, 1, 20, '2021-06-18 08:10:13', NULL, 5, 'aaaa', '已收货');
INSERT INTO `buyform` VALUES (68, 1, 1, 21, '2021-06-18 08:10:13', NULL, 4, 'aaaa', '已收货');

-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `user_id` int(0) NOT NULL,
  `product_id` int(0) NOT NULL,
  `amount` int(0) NOT NULL DEFAULT 1,
  `create_time` datetime(0) NULL DEFAULT NULL,
  `update_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `product_id`(`product_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 154 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cart
-- ----------------------------
INSERT INTO `cart` VALUES (57, 2, 9, 1, '2021-06-03 20:03:26', NULL);
INSERT INTO `cart` VALUES (58, 2, 8, 1, '2021-06-03 20:03:26', NULL);
INSERT INTO `cart` VALUES (154, 1, 19, 2, '2021-06-18 09:28:18', NULL);

-- ----------------------------
-- Table structure for classify
-- ----------------------------
DROP TABLE IF EXISTS `classify`;
CREATE TABLE `classify`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  `update_name` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 39 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of classify
-- ----------------------------
INSERT INTO `classify` VALUES (1, '玫瑰', '2021-05-19 22:49:50', NULL);
INSERT INTO `classify` VALUES (2, '向日葵', '2021-05-27 00:54:42', NULL);
INSERT INTO `classify` VALUES (3, '康乃馨', '2021-05-27 00:56:32', NULL);
INSERT INTO `classify` VALUES (4, '永生花', '2021-05-27 00:59:53', NULL);
INSERT INTO `classify` VALUES (5, '郁金香', '2021-05-27 01:03:09', NULL);
INSERT INTO `classify` VALUES (6, '绣球花', '2021-05-27 01:06:24', NULL);
INSERT INTO `classify` VALUES (7, '满天星', '2021-06-13 00:03:25', NULL);

-- ----------------------------
-- Table structure for classify2
-- ----------------------------
DROP TABLE IF EXISTS `classify2`;
CREATE TABLE `classify2`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `person` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  `update_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of classify2
-- ----------------------------
INSERT INTO `classify2` VALUES (1, 'friend', '2021-06-10 15:28:49', NULL);
INSERT INTO `classify2` VALUES (2, 'lover', '2021-06-10 15:28:24', NULL);
INSERT INTO `classify2` VALUES (3, 'elder', '2021-06-10 15:28:26', NULL);

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `classify_id` int(0) NOT NULL COMMENT '分类id',
  `classify2_id` int(0) NULL DEFAULT NULL COMMENT '分类2id',
  `product_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '商品名称',
  `product_img` varchar(155) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '图片',
  `intro` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '简介',
  `details` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '详情',
  `price` decimal(10, 2) NULL DEFAULT NULL COMMENT '价格',
  `inventory` int(0) NULL DEFAULT NULL COMMENT '库存',
  `sales_count` int(0) NULL DEFAULT NULL COMMENT '销量',
  `create_time` timestamp(0) NULL DEFAULT NULL,
  `update_time` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `classify_id`(`classify_id`) USING BTREE,
  INDEX `classify2_id`(`classify2_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 119 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES (1, 6, 1, '奈何情甄', '/images/9012414.jpg_220x240.jpg', '春风化雨暖透我的心', '[清新设计 多样花材] 粉色康乃馨10枝，浅蓝色绣球1枝，浅紫色紫罗兰5枝', 290.00, 281, 1202, '2021-05-27 23:45:14', '2021-06-02 19:43:56');
INSERT INTO `product` VALUES (2, 1, 2, '月光女神', '/images/9012175.jpg_220x240.jpg', '她将成为我的爱人', '[小清新设计 清新无比] 坦尼克玫瑰11枝，绿色桔梗5枝，小菊3枝，白色石竹梅4枝', 299.00, 366, 510, '2021-05-27 00:48:56', NULL);
INSERT INTO `product` VALUES (3, 1, 2, '不变的承诺', '/images/9012177.jpg_220x240.jpg', '爱她就送她一束99枝的玫瑰', '[经典99枝，鼎力推荐！] 99枝卡罗拉红玫瑰', 799.00, 123, 724, '2021-05-20 20:48:54', NULL);
INSERT INTO `product` VALUES (4, 1, 2, '恋恋情深', '/images/9012243.jpg_220x240.jpg', '爱你是细水长流', '[经典款式 简约设计] 11枝香槟玫瑰，白色多头百合2枝', 257.00, 789, 844, '2021-05-20 21:05:29', NULL);
INSERT INTO `product` VALUES (5, 1, 2, '亲爱的你', '/images/9012455.jpg_220x240.jpg', '我想在阳光下满身花香', '[5.20情人节新品] 戴安娜玫瑰33枝、粉色美女樱10枝', 439.00, 458, 166, '2021-05-21 11:31:08', NULL);
INSERT INTO `product` VALUES (6, 3, 3, '恩情无限', '/images/9012189.jpg_220x240.jpg', ' 我喜欢的样子你都有', '[精选花材 精心设计] 粉色康乃馨11枝，百合2枝', 175.00, 45, 172, '2021-05-27 00:57:39', NULL);
INSERT INTO `product` VALUES (7, 1, 2, '一往情深', '/images/9010966.jpg_220x240.jpg', '我对你始终一往情深', '[经典爆款，年销售冠军！] 精品玫瑰礼盒:19枝卡罗拉红玫瑰，勿忘我1枝', 248.00, 1891, 13513, '2021-05-27 00:46:43', NULL);
INSERT INTO `product` VALUES (8, 1, 2, '你是唯一', '/images/9012471.jpg_220x240.jpg', '人间蹉跎，你是唯一值得', '[11枝新品 一心一意的爱] 卡罗拉红玫瑰11枝', 139.00, 980, 690, '2021-05-27 00:51:07', NULL);
INSERT INTO `product` VALUES (9, 2, 1, '一路向阳', '/images/9012452.jpg_220x240.jpg', '你的爱就像一束阳光', '[花艺师打造 韩式花束系列] 向日葵3枝、香槟玫瑰9枝、橙色多头玫5枝、黄色腊梅5枝、大叶尤加利5枝', 296.00, 456, 736, '2021-05-27 00:53:23', NULL);
INSERT INTO `product` VALUES (10, 2, 3, '星河璀璨', '/images/9012440.jpg', ' 你如璀璨的星河,焕发光芒。', '[倾情设计，灿若星河] 香槟玫瑰9枝、蓝绣球、向日葵、白色洋桔梗、大叶尤加利', 288.00, 789, 6303, '2021-06-14 14:44:04', NULL);
INSERT INTO `product` VALUES (11, 1, 1, '初心不负', '/images/9012450.jpg', '不悔初心，不负初心。', '[花艺师打造 韩式花束系列] 韩式花束系列花艺师全新打造，卡罗拉玫瑰11枝、白底粉边洋桔梗5枝、大叶尤加利10枝', 229.00, 87, 789, '2021-06-12 20:15:41', NULL);
INSERT INTO `product` VALUES (12, 3, 3, '感恩母亲', '/images/9012505.jpg', '山，没有母亲的爱高。', '[2021母亲节新品] 玫红色康乃馨9枝、粉色多头康乃馨10枝', 169.00, 489, 3370, '2021-06-12 22:07:42', NULL);
INSERT INTO `product` VALUES (13, 3, 3, '健康喜乐', '/images/9012503.jpg', ' 愿你此生，平安喜乐', '[2021母亲节新品] 红色康乃馨29枝、粉色百合3枝、黄色勿忘我3枝、尤加利10枝', 269.00, 339, 2354, '2021-06-12 22:10:30', NULL);
INSERT INTO `product` VALUES (14, 3, 3, '温柔以待', '/images/9012461.jpg', ' 温柔的人，都是人间宝藏', '[花艺师打造 韩式系列] 粉色康乃馨13枝，戴安娜玫瑰5枝、粉色洋桔梗5枝、浅紫紫罗兰5枝、尤加利10枝', 239.00, 319, 1650, '2021-06-12 22:12:40', NULL);
INSERT INTO `product` VALUES (15, 3, 3, '幸福万年长', '/images/9012204.jpg', '有爱有家，幸福万年长。', '[温暖花束 幸福万年长] 红色康乃馨66枝，白边紫色多头康乃馨15枝，栀子叶2扎', 332.00, 486, 4522, '2021-06-12 22:15:49', NULL);
INSERT INTO `product` VALUES (16, 1, 3, '圆满', '/images/9012047.jpg', '月圆人圆事事圆', '[花篮设计 送礼百搭] 粉百合2枝、卡罗拉红玫瑰9枝、红色康乃馨15枝', 279.00, 368, 9710, '2021-06-12 22:17:32', NULL);
INSERT INTO `product` VALUES (17, 2, 1, '爱如阳光', '/images/9012520.jpg', '穿过风，路过雨，遇见你', '[毕业季新品] 向日葵+香槟玫瑰+多头玫瑰', 219.00, 97, 534, '2021-06-12 23:53:20', NULL);
INSERT INTO `product` VALUES (18, 1, 1, '我只钟情你', '/images/9012223.jpg', '让我们乘着芬芳的清风', '[错落有致 甜蜜纯洁] 香槟玫瑰11枝、白色小雏菊3枝', 236.00, 780, 4000, '2021-06-12 23:55:12', NULL);
INSERT INTO `product` VALUES (19, 1, 1, '甜美公主', '/images/9012154.jpg', '清晰甜美的空气里呼吸', '[甜美设计 清新典雅] 坦尼克玫瑰22枝，粉佳人粉玫瑰14枝，粉色桔梗5枝', 368.00, 277, 600, '2021-06-12 23:56:52', NULL);
INSERT INTO `product` VALUES (20, 7, 1, '满天星-浅粉', '/images/9012446.jpg', '我携满天星辰赠你', '[满天星辰，只因有你] 满天星10枝', 198.00, 367, 4487, '2021-06-13 00:04:19', NULL);
INSERT INTO `product` VALUES (21, 1, 1, '甜蜜相伴', '/images/9012345.jpg', ' 花掉一整幅青春，用来寻你', '[创意包装 高端大气] 粉佳人玫瑰9枝，白色洋桔梗0.2扎', 176.00, 598, 7038, '2021-06-13 00:08:16', NULL);
INSERT INTO `product` VALUES (22, 2, 1, '心向暖阳', '/images/9012072.jpg', '每一天都有温暖入怀', '[心向暖阳，快乐相伴] 向日葵6枝', 189.00, 787, 9983, '2021-06-13 00:17:36', NULL);
INSERT INTO `product` VALUES (23, 1, 2, '用心爱你', '/images/9010855.jpg', '你的爱总在我心间。', '[与你相守，直到天荒地老] 99枝：33枝戴安娜玫瑰＋66枝卡罗拉红玫瑰', 569.00, 889, 3720, '2021-06-13 00:22:12', NULL);
INSERT INTO `product` VALUES (24, 3, 3, '妈，辛苦啦', '/images/9012504.jpg', ' 妈妈是超人', '[2021母亲节新品] 玫红色康乃馨16枝、粉色洋桔梗5枝、尤加利10枝', 218.00, 198, 232, '2021-06-13 00:27:16', NULL);
INSERT INTO `product` VALUES (25, 4, 2, '一鹿(路)有你', '/images/1073264.jpg', '一路有你的陪伴', '[创意 永生花礼盒] 永生花礼盒', 298.00, 498, 1810, '2021-06-13 10:28:19', NULL);
INSERT INTO `product` VALUES (26, 4, 3, '花好月圆', '/images/1073276.jpg', '但愿人长久', '[畅销礼物 节日定制款] 精选进口多色永生康乃馨台灯', 298.00, 544, 1324, '2021-06-13 10:30:18', NULL);
INSERT INTO `product` VALUES (27, 4, 2, '满月', '/images/1073263.jpg', '星河滚烫，你是人间理想', '[创意永生花台灯] 永生花台灯', 399.00, 231, 769, '2021-06-13 10:33:01', '2021-06-17 01:21:34');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `sex` enum('男','女') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `phone` bigint(0) NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `creat_time` datetime(0) NULL DEFAULT NULL,
  `updata_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 39 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'xyj', '99446f49c2cdbe5c10c3ed1db74bcb16', '男', 17879681696, '1942049754@qq.com', '2021-05-22 20:48:13', NULL);
INSERT INTO `users` VALUES (2, 'xyl', 'e10adc3949ba59abbe56e057f20f883e', '女', 13611292622, '2904672234@qq.com', '2021-05-22 20:48:16', NULL);

SET FOREIGN_KEY_CHECKS = 1;
