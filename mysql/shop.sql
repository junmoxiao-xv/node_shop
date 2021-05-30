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

 Date: 30/05/2021 15:52:55
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address`  (
  `id` int(0) NOT NULL,
  `user_id` int(0) NOT NULL,
  `province` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `city` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `region` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  `updata_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

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
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, 'e10adc3949ba59abbe56e057f20f883e', '0', '2021-05-30 01:31:54', NULL, '1942049754@qq.com');
INSERT INTO `admin` VALUES (2, 'e10adc3949ba59abbe56e057f20f883e', '0', '2021-05-30 01:30:27', NULL, '1063079106@qq.com');
INSERT INTO `admin` VALUES (3, 'e10adc3949ba59abbe56e057f20f883e', '0', '2021-05-30 12:04:00', NULL, '2904672234@qq.com');
INSERT INTO `admin` VALUES (7, '202cb962ac59075b964b07152d234b70', '0', NULL, NULL, '3116005129@mail2.gdut.edu.cn');

-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart`  (
  `id` int(0) NOT NULL,
  `user_id` int(0) NOT NULL,
  `product_id` int(0) NOT NULL,
  `count` int(0) NOT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  `update_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

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
INSERT INTO `classify` VALUES (1, '白玫瑰', '2021-05-19 22:49:50', NULL);
INSERT INTO `classify` VALUES (2, '红玫瑰', '2021-05-20 20:42:37', NULL);
INSERT INTO `classify` VALUES (3, '香槟玫瑰', '2021-05-20 21:07:48', NULL);
INSERT INTO `classify` VALUES (4, '粉色玫瑰', '2021-05-21 11:32:19', NULL);
INSERT INTO `classify` VALUES (5, '向日葵', '2021-05-27 00:54:42', NULL);
INSERT INTO `classify` VALUES (6, '康乃馨', '2021-05-27 00:56:32', NULL);
INSERT INTO `classify` VALUES (7, '永生花', '2021-05-27 00:59:53', NULL);
INSERT INTO `classify` VALUES (8, '郁金香', '2021-05-27 01:03:09', NULL);
INSERT INTO `classify` VALUES (9, '绣球花', '2021-05-27 01:06:24', NULL);

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `classify_id` int(0) NOT NULL COMMENT '分类id',
  `product_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '商品名称',
  `product_img` varchar(155) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '图片',
  `intro` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '简介',
  `details` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '详情',
  `price` decimal(10, 2) NULL DEFAULT NULL COMMENT '价格',
  `status` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '状态',
  `inventory` int(0) NULL DEFAULT NULL COMMENT '库存',
  `sales_count` int(0) NULL DEFAULT NULL COMMENT '销量',
  `create_time` datetime(0) NULL DEFAULT NULL,
  `update_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 67 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES (1, 9, '奈何情甄', '/images/9012414.jpg_220x240.jpg', '春风化雨暖透我的心', '[清新设计 多样花材] 粉色康乃馨10枝，浅蓝色绣球1枝，浅紫色紫罗兰5枝', 289.00, '1', 281, 1201, '2021-05-27 23:45:14', NULL);
INSERT INTO `product` VALUES (2, 1, '月光女神', '/images/9012175.jpg_220x240.jpg', '她将成为我的爱人', '[小清新设计 清新无比] 坦尼克玫瑰11枝，绿色桔梗5枝，小菊3枝，白色石竹梅4枝', 299.00, '1', 366, 510, '2021-05-27 00:48:56', NULL);
INSERT INTO `product` VALUES (3, 2, '不变的承诺', '/images/9012177.jpg_220x240.jpg', '爱她就送她一束99枝的玫瑰', '[经典99枝，鼎力推荐！] 99枝卡罗拉红玫瑰', 799.00, '1', 123, 724, '2021-05-20 20:48:54', NULL);
INSERT INTO `product` VALUES (4, 3, '恋恋情深', '/images/9012243.jpg_220x240.jpg', '爱你是细水长流', '[经典款式 简约设计] 11枝香槟玫瑰，白色多头百合2枝', 257.00, '1', 789, 844, '2021-05-20 21:05:29', NULL);
INSERT INTO `product` VALUES (5, 4, '亲爱的你', '/images/9012455.jpg_220x240.jpg', '我想在阳光下满身花香', '[5.20情人节新品] 戴安娜玫瑰33枝、粉色美女樱10枝', 439.00, '1', 458, 166, '2021-05-21 11:31:08', NULL);
INSERT INTO `product` VALUES (6, 6, '恩情无限', '/images/9012189.jpg_220x240.jpg', ' 我喜欢的样子你都有', '[精选花材 精心设计] 粉色康乃馨11枝，百合2枝', 175.00, '1', 45, 172, '2021-05-27 00:57:39', NULL);
INSERT INTO `product` VALUES (7, 2, '一往情深', '/images/9010966.jpg_220x240.jpg', '我对你始终一往情深', '[经典爆款，年销售冠军！] 精品玫瑰礼盒:19枝卡罗拉红玫瑰，勿忘我1枝', 248.00, '1', 1891, 13513, '2021-05-27 00:46:43', NULL);
INSERT INTO `product` VALUES (8, 2, '你是唯一', '/images/9012471.jpg_220x240.jpg', '人间蹉跎，你是唯一值得', '[11枝新品 一心一意的爱] 卡罗拉红玫瑰11枝', 139.00, '1', 980, 690, '2021-05-27 00:51:07', NULL);
INSERT INTO `product` VALUES (9, 5, '一路向阳', '/images/9012452.jpg_220x240.jpg', '你的爱就像一束阳光', '[花艺师打造 韩式花束系列] 向日葵3枝、香槟玫瑰9枝、橙色多头玫5枝、黄色腊梅5枝、大叶尤加利5枝', 296.00, '1', 456, 736, '2021-05-27 00:53:23', NULL);
INSERT INTO `product` VALUES (10, 8, '爱的芬芳', '/images/9012164.jpg', '我会遇见你，在人海茫茫', '白色郁金香9枝，粉色郁金香9枝，紫色小菊3枝，高山羊齿叶7枝', 308.00, '1', 67, 141, '2021-05-27 01:02:37', NULL);
INSERT INTO `product` VALUES (11, 7, '一路有你', '/images/1073264.jpg_220x240.jpg', '一路都有我的陪伴', '[创意 永生花礼盒] 永生花礼盒', 298.00, '1', 56, 178, '2021-05-27 00:59:37', NULL);

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
  `head_portrait` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `status` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `creat_time` datetime(0) NULL DEFAULT NULL,
  `updata_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 36 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (31, 'xyj', '99446f49c2cdbe5c10c3ed1db74bcb16', '男', 17879681696, '1942049754@qq.com', NULL, NULL, '2021-05-22 20:48:13', NULL);
INSERT INTO `users` VALUES (32, 'xyl', 'e10adc3949ba59abbe56e057f20f883e', '女', 13611292622, '2904672234@qq.com', NULL, NULL, '2021-05-22 20:48:16', NULL);
INSERT INTO `users` VALUES (33, 'sss', 'e10adc3949ba59abbe56e057f20f883e', '男', 17770706396, '1942049754@qq.com', NULL, NULL, '2021-05-22 20:48:18', NULL);
INSERT INTO `users` VALUES (34, 'xyk', 'e10adc3949ba59abbe56e057f20f883e', '男', 17879681600, '3116005129@mail2.gdut.edu.cn', NULL, NULL, '2021-05-22 20:48:21', NULL);
INSERT INTO `users` VALUES (35, 'we', 'e10adc3949ba59abbe56e057f20f883e', '男', 17879681666, '2904672234@qq.com', NULL, NULL, '2021-05-22 20:48:23', NULL);

SET FOREIGN_KEY_CHECKS = 1;
