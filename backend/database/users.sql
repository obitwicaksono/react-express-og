/*
 Navicat Premium Dump SQL

 Source Server         : react-express
 Source Server Type    : MySQL
 Source Server Version : 80042 (8.0.42)
 Source Host           : localhost:3306
 Source Schema         : express_mysql

 Target Server Type    : MySQL
 Target Server Version : 80042 (8.0.42)
 File Encoding         : 65001

 Date: 24/09/2025 04:51:06
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `email`(`email` ASC) USING BTREE,
  INDEX `idx_users_email`(`email` ASC) USING BTREE,
  INDEX `idx_users_name`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'John Doe', 'john.doe@example.com', 'Jl. Sudirman No. 1, Jakarta', '2025-07-10 00:48:53', '2025-07-10 00:48:53');
INSERT INTO `users` VALUES (2, 'Jane Smith', 'jane.smith@example.com', 'Jl. Thamrin No. 2, Jakarta', '2025-07-10 00:48:53', '2025-07-10 00:48:53');
INSERT INTO `users` VALUES (3, 'Ahmad Wijaya', 'ahmad.wijaya@example.com', 'Jl. Malioboro No. 3, Yogyakarta', '2025-07-10 00:48:53', '2025-07-10 00:48:53');
INSERT INTO `users` VALUES (8, 'Robertho Wicaksono', 'obit@mail.com', 'Jl. Banaran No.120\nRT 10 RW 04', '2025-07-10 00:54:20', '2025-07-10 00:54:20');

SET FOREIGN_KEY_CHECKS = 1;
