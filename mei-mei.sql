/*
 Navicat Premium Data Transfer

 Source Server         : Kết nối cục bộ
 Source Server Type    : MySQL
 Source Server Version : 80025
 Source Host           : localhost:3306
 Source Schema         : mei-mei
 Target Server Type    : MySQL
 Target Server Version : 80025
 File Encoding         : 65001

 Date: 06/01/2022 17:43:48
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for config
-- ----------------------------
DROP TABLE IF EXISTS `config`;
CREATE TABLE `config`  (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT 'Thời gian sáng tạo',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT 'Cập nhật thời gian',
  `create_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'người sáng lập',
  `update_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Cập nhật',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Nhận xét',
  `config_id` int(0) NOT NULL AUTO_INCREMENT COMMENT 'Phím tham số',
  `config_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Tên tham số',
  `config_key` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Tên khóa tham số',
  `config_value` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Giá trị khóa tham số',
  `config_type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'N' COMMENT 'Hệ thống được xây dựng -in (y là N không)',
  PRIMARY KEY (`config_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of config
-- ----------------------------
INSERT INTO `config` VALUES ('2022-01-06 13:39:57.695833', '2022-01-06 13:39:57.695833', 'admin', 'admin', 'Nhạc khẩu mật khẩu 123456', 1, 'Quản lý người dùng-Mật khẩu ban đầu', 'sys.user.initPassword', '123456', 'Y');

-- ----------------------------
-- Table structure for dept
-- ----------------------------
DROP TABLE IF EXISTS `dept`;
CREATE TABLE `dept`  (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT 'Thời gian sáng tạo',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT 'Cập nhật thời gian',
  `create_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'người sáng lập',
  `update_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Cập nhật',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Nhận xét',
  `dept_id` int(0) NOT NULL AUTO_INCREMENT COMMENT 'ID bộ phận',
  `dept_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Tên bộ phận',
  `order_num` int(0) NOT NULL DEFAULT 0 COMMENT 'Hiển thị thứ tự',
  `leader` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'hiệu trưởng',
  `phone` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'số liên lạc',
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Email',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT 'Nhà nước bộ phận (0 bình thường 1 Tắt)',
  `del_flag` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT 'Xóa logo (0 đại diện cho sự tồn tại 2 đại diện cho xóa)',
  `mpath` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '',
  `parentDeptId` int(0) DEFAULT NULL COMMENT 'ID bộ phận',
  PRIMARY KEY (`dept_id`) USING BTREE,
  INDEX `FK_427c332b4ebe1147caa3328adfa`(`parentDeptId`) USING BTREE,
  CONSTRAINT `FK_427c332b4ebe1147caa3328adfa` FOREIGN KEY (`parentDeptId`) REFERENCES `dept` (`dept_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dept
-- ----------------------------
INSERT INTO `dept` VALUES ('2021-12-29 16:36:06.320221', '2022-01-06 13:39:00.000000', 'admin', 'admin', '', 1, 'Trụ sở chính', 1, 'Ảm đạm', '13006133172', '87789771@qq.com', '0', '0', '1.', NULL);

-- ----------------------------
-- Table structure for dict_data
-- ----------------------------
DROP TABLE IF EXISTS `dict_data`;
CREATE TABLE `dict_data`  (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT 'Thời gian sáng tạo',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT 'Cập nhật thời gian',
  `create_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'người sáng lập',
  `update_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Cập nhật',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Nhận xét',
  `dict_data` int(0) NOT NULL AUTO_INCREMENT COMMENT 'Từ điển',
  `dict_sort` int(0) NOT NULL DEFAULT 0 COMMENT 'Từ điển',
  `dict_label` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Nhãn từ điển',
  `dict_value` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Giá trị khóa từ điển',
  `css_class` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Thuộc tính kiểu (phần mở rộng kiểu khác)',
  `list_class` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'BẢNG BACK',
  `is_default` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'N' COMMENT 'Có mặc định không (y là N không)',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT 'Trạng thái (0 bình thường 1 Tắt)',
  `dictTypeDictId` int(0) DEFAULT NULL COMMENT 'Loại từ điển id',
  PRIMARY KEY (`dict_data`) USING BTREE,
  INDEX `FK_bddc8251ad1c1ed3bcad5208a15`(`dictTypeDictId`) USING BTREE,
  CONSTRAINT `FK_bddc8251ad1c1ed3bcad5208a15` FOREIGN KEY (`dictTypeDictId`) REFERENCES `dict_type` (`dict_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dict_data
-- ----------------------------
INSERT INTO `dict_data` VALUES ('2022-01-06 17:22:28.610065', '2022-01-06 17:22:28.610065', 'admin', 'admin', 'tình trạng bình thường', 1, 1, 'Hoạt động', '0', NULL, 'primary', 'N', '0', 1);
INSERT INTO `dict_data` VALUES ('2022-01-06 17:22:46.633485', '2022-01-06 17:22:46.633485', 'admin', 'admin', 'Ngừng trạng thái', 2, 2, 'Ngừng', '1', NULL, 'danger', 'N', '0', 1);
INSERT INTO `dict_data` VALUES ('2022-01-06 17:23:10.503824', '2022-01-06 17:23:10.503824', 'admin', 'admin', 'Hệ thống mặc định', 3, 1, 'Vâng', 'Y', NULL, 'primary', 'N', '0', 2);
INSERT INTO `dict_data` VALUES ('2022-01-06 17:23:27.925513', '2022-01-06 17:23:27.925513', 'admin', 'admin', 'Là hệ thống mặc định', 4, 2, 'không', 'N', NULL, 'danger', 'N', '0', 2);
INSERT INTO `dict_data` VALUES ('2022-01-06 17:23:53.124506', '2022-01-06 17:23:53.124506', 'admin', 'admin', 'Lưu lại ý', 5, 1, 'Lưu lại ý', '1', NULL, 'warning', 'N', '0', 3);
INSERT INTO `dict_data` VALUES ('2022-01-06 17:24:48.108480', '2022-01-06 17:24:48.108480', 'admin', 'admin', 'sự thông báo', 6, 2, 'sự thông báo', '2', NULL, 'success', 'N', '0', 3);
INSERT INTO `dict_data` VALUES ('2022-01-06 17:25:16.677767', '2022-01-06 17:25:16.677767', 'admin', 'admin', 'tình trạng bình thường', 7, 1, 'Hoạt động', '0', NULL, 'primary', 'N', '0', 4);
INSERT INTO `dict_data` VALUES ('2022-01-06 17:25:31.685121', '2022-01-06 17:25:31.685121', 'admin', 'admin', 'Vô hiệu hóa', 8, 2, 'Khép kín', '1', NULL, 'danger', 'N', '0', 4);
INSERT INTO `dict_data` VALUES ('2022-01-06 17:26:13.034016', '2022-01-06 17:26:13.034016', 'admin', 'admin', 'Menu hiển thị', 9, 1, 'trình diễn', '0', NULL, 'primary', 'N', '0', 5);
INSERT INTO `dict_data` VALUES ('2022-01-06 17:26:28.928726', '2022-01-06 17:26:28.928726', 'admin', 'admin', 'Menu ẩn', 10, 2, 'ẩn giấu', '1', NULL, 'danger', 'N', '0', 5);
INSERT INTO `dict_data` VALUES ('2022-01-06 17:26:53.936024', '2022-01-06 17:26:53.936024', 'admin', 'admin', 'Tình dục: Nam', 11, 1, 'Nam giới', '0', NULL, 'default', 'N', '0', 6);
INSERT INTO `dict_data` VALUES ('2022-01-06 17:27:09.341366', '2022-01-06 17:27:09.341366', 'admin', 'admin', '', 12, 2, 'Nữ giới', '1', NULL, 'default', 'N', '0', 6);
INSERT INTO `dict_data` VALUES ('2022-01-06 17:27:26.557747', '2022-01-06 17:27:26.557747', 'admin', 'admin', '', 13, 3, 'không xác định', '2', NULL, 'default', 'N', '0', 6);
INSERT INTO `dict_data` VALUES ('2022-01-06 17:28:03.075867', '2022-01-06 17:28:03.075867', 'admin', 'admin', 'Hoạt động khác', 14, 1, 'khác', '1', '', 'default', 'N', '0', 7);
INSERT INTO `dict_data` VALUES ('2022-01-06 17:28:17.031908', '2022-01-06 17:28:17.031908', 'admin', 'admin', 'Chèn hoạt động', 15, 2, 'chèn', '2', NULL, 'primary', 'N', '0', 7);
INSERT INTO `dict_data` VALUES ('2022-01-06 17:28:31.698386', '2022-01-06 17:28:31.698386', 'admin', 'admin', 'Cập nhật hoạt động', 16, 3, 'thay mới', '3', NULL, 'success', 'N', '0', 7);
INSERT INTO `dict_data` VALUES ('2022-01-06 17:28:47.336031', '2022-01-06 17:28:47.336031', 'admin', 'admin', 'Xóa hoạt động', 17, 4, 'xóa bỏ', '4', NULL, 'danger', 'N', '0', 7);
INSERT INTO `dict_data` VALUES ('2022-01-06 17:29:02.638173', '2022-01-06 17:29:02.638173', 'admin', 'admin', 'Hoạt động được ủy quyền', 18, 5, 'Ủy quyền', '5', NULL, 'info', 'N', '0', 7);
INSERT INTO `dict_data` VALUES ('2022-01-06 17:29:17.692132', '2022-01-06 17:29:17.692132', 'admin', 'admin', 'Hoạt động xuất khẩu', 19, 6, 'Xuất khẩu', '6', NULL, 'primary', 'N', '0', 7);
INSERT INTO `dict_data` VALUES ('2022-01-06 17:29:32.192795', '2022-01-06 17:29:32.192795', 'admin', 'admin', 'Nhập hoạt động', 20, 7, 'Nhập khẩu', '7', NULL, 'success', 'N', '0', 7);
INSERT INTO `dict_data` VALUES ('2022-01-06 17:29:47.511268', '2022-01-06 17:29:47.511268', 'admin', 'admin', 'Hoạt động hưu trí mạnh mẽ', 21, 8, 'Lực lượng', '8', NULL, 'info', 'N', '0', 7);
INSERT INTO `dict_data` VALUES ('2022-01-06 17:30:06.376073', '2022-01-06 17:30:06.376073', 'admin', 'admin', 'Xóa hoạt động', 22, 9, 'Gỡ bỏ', '9', NULL, 'danger', 'N', '0', 7);
INSERT INTO `dict_data` VALUES ('2022-01-06 17:30:29.075463', '2022-01-06 17:30:29.075463', 'admin', 'admin', 'tình trạng bình thường', 23, 1, 'thành công', '0', NULL, 'primary', 'N', '0', 8);
INSERT INTO `dict_data` VALUES ('2022-01-06 17:30:44.318238', '2022-01-06 17:30:57.000000', 'admin', 'admin', 'Ngừng trạng thái', 24, 2, 'Thất bại', '1', NULL, 'danger', 'N', '0', 8);
INSERT INTO `dict_data` VALUES ('2022-01-06 17:31:19.931468', '2022-01-06 17:31:19.931468', 'admin', 'admin', 'tình trạng bình thường', 25, 1, 'Hoạt động', '0', NULL, 'primary', 'N', '0', 9);
INSERT INTO `dict_data` VALUES ('2022-01-06 17:31:34.260922', '2022-01-06 17:31:34.260922', 'admin', 'admin', 'Ngừng trạng thái', 26, 2, 'tạm ngừng', '1', NULL, 'danger', 'N', '0', 9);
INSERT INTO `dict_data` VALUES ('2022-01-06 17:31:54.560801', '2022-01-06 17:31:54.560801', 'admin', 'admin', 'Nhóm mặc định', 27, 1, 'mặc định', 'DEFAULT', NULL, 'default', 'N', '0', 10);
INSERT INTO `dict_data` VALUES ('2022-01-06 17:32:11.831282', '2022-01-06 17:32:11.831282', 'admin', 'admin', 'Nhóm hệ thống', 28, 2, 'hệ thống', 'SYSTEM', NULL, 'default', 'N', '0', 10);

-- ----------------------------
-- Table structure for dict_type
-- ----------------------------
DROP TABLE IF EXISTS `dict_type`;
CREATE TABLE `dict_type`  (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT 'Thời gian sáng tạo',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT 'Cập nhật thời gian',
  `create_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'người sáng lập',
  `update_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Cập nhật',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Nhận xét',
  `dict_id` int(0) NOT NULL AUTO_INCREMENT COMMENT 'Loại từ điển id',
  `dict_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Tên từ điển',
  `dict_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Từ điển',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT 'Trạng thái (0 bình thường 1 điểm dừng)',
  PRIMARY KEY (`dict_id`) USING BTREE,
  UNIQUE INDEX `IDX_003e8d417dc1f24cd03575cb9e`(`dict_type`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dict_type
-- ----------------------------
INSERT INTO `dict_type` VALUES ('2022-01-06 17:19:32.611851', '2022-01-06 17:19:32.611851', 'admin', 'admin', 'Danh sách chuyển đổi hệ thống', 1, 'Công tắc hệ thống', 'sys_normal_disable', '0');
INSERT INTO `dict_type` VALUES ('2022-01-06 17:19:55.785151', '2022-01-06 17:19:55.785151', 'admin', 'admin', 'Liệu danh sách hệ thống có', 2, 'Cho dù hệ thống', 'sys_yes_no', '0');
INSERT INTO `dict_type` VALUES ('2022-01-06 17:20:09.089782', '2022-01-06 17:20:09.089782', 'admin', 'admin', 'Danh sách loại thông báo', 3, 'Loại thông báo', 'sys_notice_type', '0');
INSERT INTO `dict_type` VALUES ('2022-01-06 17:20:20.222661', '2022-01-06 17:20:20.222661', 'admin', 'admin', 'Danh sách trạng thái thông báo', 4, 'Trạng thái thông báo', 'sys_notice_status', '0');
INSERT INTO `dict_type` VALUES ('2022-01-06 17:20:43.378711', '2022-01-06 17:20:43.378711', 'admin', 'admin', 'Danh sách trạng thái menu', 5, 'Trạng thái menu', 'sys_show_hide', '0');
INSERT INTO `dict_type` VALUES ('2022-01-06 17:20:58.306460', '2022-01-06 17:20:58.306460', 'admin', 'admin', 'Danh sách giới tính của người dùng', 6, 'Giới tính', 'sys_user_sex', '0');
INSERT INTO `dict_type` VALUES ('2022-01-06 17:21:17.184524', '2022-01-06 17:21:17.184524', 'admin', 'admin', 'Danh sách loại hoạt động', 7, 'Loại hoạt động', 'sys_oper_type', '0');
INSERT INTO `dict_type` VALUES ('2022-01-06 17:21:34.350301', '2022-01-06 17:21:34.350301', 'admin', 'admin', 'Danh sách trạng thái đăng nhập', 8, 'trạng thái hệ thống', 'sys_common_status', '0');
INSERT INTO `dict_type` VALUES ('2022-01-06 17:21:49.814326', '2022-01-06 17:21:49.814326', 'admin', 'admin', 'Danh sách trạng thái nhiệm vụ', 9, 'Tình trạng nhiệm vụ', 'sys_job_status', '0');
INSERT INTO `dict_type` VALUES ('2022-01-06 17:22:00.163750', '2022-01-06 17:22:00.163750', 'admin', 'admin', 'Danh sách nhóm nhiệm vụ', 10, 'Nhóm nhiệm vụ', 'sys_job_group', '0');

-- ----------------------------
-- Table structure for job
-- ----------------------------
DROP TABLE IF EXISTS `job`;
CREATE TABLE `job`  (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT 'Thời gian sáng tạo',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT 'Cập nhật thời gian',
  `create_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'người sáng lập',
  `update_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Cập nhật',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Nhận xét',
  `job_id` int(0) NOT NULL AUTO_INCREMENT COMMENT 'Id nhiệm vụ',
  `job_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Tên nhiệm vụ',
  `job_group` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'DEFAULT' COMMENT 'Tên nhóm nhiệm vụ',
  `invoke_target` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Gọi chuỗi đích',
  `cron_expression` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'biểu thức thực thi cron',
  `misfire_policy` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '3' COMMENT 'Lập kế hoạch chiến lược lỗi (1 thực thi ngay lập tức 2 thực thi 3 để từ bỏ thực thi)',
  `concurrent` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT 'Có nên thực thi đồng thời (0 cho phép 1 lệnh cấm)',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT 'Trạng thái (0 bình thường 1 tạm dừng)',
  PRIMARY KEY (`job_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of job
-- ----------------------------
INSERT INTO `job` VALUES ('2022-01-06 17:35:01.664486', '2022-01-06 17:35:01.664486', 'admin', 'admin', '', 1, 'Kiểm tra nhiệm vụ thời gian', 'DEFAULT', 'JobService.ceshi(1,2,3,true)', '0/15 * * * * ?', '3', '1', '1');

-- ----------------------------
-- Table structure for job_log
-- ----------------------------
DROP TABLE IF EXISTS `job_log`;
CREATE TABLE `job_log`  (
  `job_log_id` int(0) NOT NULL AUTO_INCREMENT COMMENT 'ID nhật ký nhiệm vụ',
  `job_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Tên nhiệm vụ',
  `job_group` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Tên nhóm nhiệm vụ',
  `invoke_target` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Gọi chuỗi đích',
  `job_message` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Thông tin đăng nhập',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT'Trạng thái điều hành (0 thất bại bình thường)',
  `exception_info` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Thông tin bất thường',
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT 'Thời gian sáng tạo',
  PRIMARY KEY (`job_log_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for logininfor
-- ----------------------------
DROP TABLE IF EXISTS `logininfor`;
CREATE TABLE `logininfor`  (
  `info_id` int(0) NOT NULL AUTO_INCREMENT COMMENT 'ID truy cập',
  `user_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'tài khoản người dùng',
  `ipaddr` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Địa chỉ IP đăng nhập',
  `login_location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Đăng nhập',
  `browser` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Loại trình duyệt',
  `os` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Loại hệ điều hành trình duyệt',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT'Trạng thái đăng nhập (0 thành công 1 thất bại)',
  `msg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Tin nhắn nhanh chóng',
  `login_time` datetime(0) NOT NULL COMMENT 'Thời gian phỏng vấn',
  PRIMARY KEY (`info_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu`  (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT 'Thời gian sáng tạo',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT 'Cập nhật thời gian',
  `create_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'người sáng lập',
  `update_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Cập nhật',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Nhận xét',
  `menu_id` int(0) NOT NULL AUTO_INCREMENT COMMENT 'ID menu',
  `menu_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Tên menu',
  `order_num` int(0) NOT NULL COMMENT 'Hiển thị thứ tự',
  `path` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Địa chỉ định tuyến',
  `component` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Đường dẫn thành phần',
  `query` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Tham số định tuyến',
  `is_frame` int(0) NOT NULL DEFAULT 1 COMMENT 'Cho dù đó là một liên kết bên ngoài (0 là 1 không)' ,
  `is_cache` int(0) NOT NULL DEFAULT 0 COMMENT 'Cho dù bộ nhớ cache (0 bộ nhớ cache 1 không có bộ đệm)',
  `menu_type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Loại menu (m Thư mục C menu f nút f)',
  `visible` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT 'Trạng thái menu (0 Hiển thị 1 ẩn)',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT 'Trạng thái menu (0 bình thường 1)' ,
  `perms` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Quyền',
  `icon` char(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '#' COMMENT 'Biểu tượng menu',
  `mpath` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '',
  `parentMenuId` int(0) DEFAULT NULL COMMENT 'ID menu',
  PRIMARY KEY (`menu_id`) USING BTREE,
  INDEX `FK_fbe2023241bd4c612415c080cc6`(`parentMenuId`) USING BTREE,
  CONSTRAINT `FK_fbe2023241bd4c612415c080cc6` FOREIGN KEY (`parentMenuId`) REFERENCES `menu` (`menu_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 73 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.401465', '2021-12-22 10:43:24.401465', '', '', '', 1, 'Quản lý hệ thống', 1, 'system', NULL, NULL, 1, 0, 'M', '0', '0', NULL, 'system', '1.', NULL);
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.406615', '2021-12-22 10:43:24.406615', '', '', '', 2, 'Giám sát Hệ Thống', 2, 'monitor', NULL, NULL, 1, 0, 'M', '0', '0', NULL, 'monitor', '2.', NULL);
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.409007', '2021-12-22 10:43:24.409007', '', '', '', 3, 'Công cụ hệ thống', 3, 'tool', NULL, NULL, 1, 0, 'M', '0', '0', NULL, 'tool', '3.', NULL);
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.411039', '2021-12-22 10:43:24.411039', '', '', '', 4, 'Quản lý người dùng', 1, 'user', 'system/user/index', NULL, 1, 0, 'C', '0', '0', 'system:user:list', 'user', '1.4.', 1);
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.412951', '2021-12-22 10:43:24.412951', '', '', '', 5, 'Quản lý vai trò', 2, 'role', 'system/role/index', NULL, 1, 0, 'C', '0', '0', 'system:role:list', 'peoples', '1.5.', 1);
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.414663', '2021-12-22 10:43:24.414663', '', '', '', 6, 'Quản lý thực đơn', 3, 'menu', 'system/menu/index', NULL, 1, 0, 'C', '0', '0', 'system:menu:list', 'tree-table', '1.6.', 1);
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.416394', '2021-12-22 10:43:24.416394', '', '', '', 7, 'Quản lý bộ phận', 4, 'dept', 'system/dept/index', NULL, 1, 0, 'C', '0', '0', 'system:dept:list', 'tree', '1.7.', 1);
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.418494', '2021-12-22 10:43:24.418494', '', '', '', 8, 'Quản lý bài', 5, 'post', 'system/post/index', NULL, 1, 0, 'C', '0', '0', 'system:post:list', 'post', '1.8.', 1);
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.420750', '2021-12-29 15:06:18.000000', '', 'admin', '', 9, 'Quản lý từ điển', 6, 'dict', 'system/dict/index', NULL, 1, 0, 'C', '0', '0', 'system:dict:list', 'dict', '1.9.', 1);
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.422744', '2021-12-22 10:43:24.422744', '', '', '', 10, 'Cài đặt tham số', 7, 'config', 'system/config/index', NULL, 1, 0, 'C', '0', '0', 'system:config:list', 'edit', '1.10.', 1);
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.424344', '2021-12-22 10:43:24.424344', '', '', '', 11, 'sự thông báo', 8, 'notice', 'system/notice/index', NULL, 1, 0, 'C', '0', '0', 'system:notice:list', 'message', '1.11.', 1);
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.426038', '2021-12-22 10:43:24.426038', '', '', '', 12, 'Quản lý nhật ký', 9, 'log', NULL, NULL, 1, 0, 'M', '0', '0', NULL, 'log', '1.12.', 1);
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.427903', '2021-12-22 10:43:24.427903', '', '', '', 13, 'Nhật ký hoạt động', 1, 'operlog', 'monitor/operlog/index', NULL, 1, 0, 'C', '0', '0', 'monitor:operlog:list', 'form', '1.12.13.', 12);
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.429545', '2021-12-22 10:43:24.429545', '', '', '', 14, 'Đăng nhập nhật ký', 2, 'logininfor', 'monitor/logininfor/index', NULL, 1, 0, 'C', '0', '0', 'monitor:logininfor:list', 'logininfor', '1.12.14.', 12);
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.431236', '2021-12-22 10:43:24.431236', '', '', '', 15, 'Truy vấn người dùng', 1, '', NULL, NULL, 1, 0, 'F', '0', '0', 'system:user:query', '#', '1.4.15.', 4);
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.432834', '2021-12-22 10:43:24.432834', '', '', '', 16, 'Người dùng mới', 2, '', NULL, NULL, 1, 0, 'F', '0', '0', 'system:user:add', '#', '1.4.16.', 4);
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.434472', '2021-12-22 10:43:24.434472', '', '', '', 17, 'Sửa đổi người dùng', 3, '', NULL, NULL, 1, 0, 'F', '0', '0', 'system:user:edit', '#', '1.4.17.', 4);
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.436075', '2021-12-22 10:43:24.436075', '', '', '', 18, 'Xóa người dùng', 4, '', NULL, NULL, 1, 0, 'F', '0', '0', 'system:user:remove', '#', '1.4.18.', 4);
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.437847', '2021-12-22 10:43:24.437847', '', '', '', 19, 'Người dùng xuất khẩu', 5, '', NULL, NULL, 1, 0, 'F', '0', '0', 'system:user:export', '#', '1.4.19.', 4);
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.439590', '2021-12-22 10:43:24.439590', '', '', '', 20, 'Nhập khẩu người dùng', 6, '', NULL, NULL, 1, 0, 'F', '0', '0', 'system:user:import', '#', '1.4.20.', 4);
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.441327', '2021-12-22 10:43:24.441327', '', '', '', 21, 'đặt lại mật khẩu', 7, '', NULL, NULL, 1, 0, 'F', '0', '0', 'system:user:resetPwd', '#', '1.4.21.', 4);
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.443415', '2021-12-22 10:43:24.443415', '', '', '', 22, 'Truy vấn vai trò', 1, '', NULL, NULL, 1, 0, 'F', '0', '0', 'system:role:query', '#', '1.5.22.', 5);
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.445096', '2021-12-22 10:43:24.445096', '', '', '', 23, 'Vai trò mới', 2, '', NULL, NULL, 1, 0, 'F', '0', '0', 'system:role:add', '#', '1.5.23.', 5);
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.446669', '2021-12-22 10:43:24.446669', '', '', '', 24, 'Sửa đổi vai trò', 3, '', NULL, NULL, 1, 0, 'F', '0', '0', 'system:role:edit', '#', '1.5.24.', 5);
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.448225', '2021-12-22 10:43:24.448225', '', '', '', 25, 'Xóa nhân vật', 4, '', NULL, NULL, 1, 0, 'F', '0', '0', 'system:role:remove', '#', '1.5.25.', 5);
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.449790', '2021-12-22 10:43:24.449790', '', '', '', 26, 'Truy vấn menu', 1, '', NULL, NULL, 1, 0, 'F', '0', '0', 'system:menu:query', '#', '1.6.26.', 6);
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.451476', '2021-12-22 10:43:24.451476', '', '', '', 27, 'Menu thêm', 2, '', NULL, NULL, 1, 0, 'F', '0', '0', 'system:menu:add', '#', '1.6.27.', 6);
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.453462', '2021-12-22 10:43:24.453462', '', '', '', 28, 'Sửa đổi menu', 3, '', NULL, NULL, 1, 0, 'F', '0', '0', 'system:menu:edit', '#', '1.6.28.', 6);
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.455110', '2021-12-22 10:43:24.455110', '', '', '', 29, 'Xóa menu', 4, '', NULL, NULL, 1, 0, 'F', '0', '0', 'system:menu:remove', '#', '1.6.29.', 6);
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.456866', '2021-12-22 10:43:24.456866', '', '', '', 30, 'Yêu cầu của bộ phận', 1, '', NULL, NULL, 1, 0, 'F', '0', '0', 'system:dept:query', '#', '1.7.30.', 7);
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.459044', '2021-12-22 10:43:24.459044', '', '', '', 31, 'Bộ phận mới', 2, '', NULL, NULL, 1, 0, 'F', '0', '0', 'system:dept:add', '#', '1.7.31.', 7);
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.461136', '2021-12-22 10:43:24.461136', '', '', '', 32, 'Sửa đổi bộ phận', 3, '', NULL, NULL, 1, 0, 'F', '0', '0', 'system:dept:edit', '#', '1.7.32.', 7);
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.463219', '2021-12-22 10:43:24.463219', '', '', '', 33, 'Xóa bộ phận', 4, '', NULL, NULL, 1, 0, 'F', '0', '0', 'system:dept:remove', '#', '1.7.33.', 7);
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.465120', '2021-12-22 10:43:24.465120', '', '', '', 34, 'Thông báo', 2, '', NULL, NULL, 1, 0, 'F', '0', '0', 'system:notice:add', '#', '1.11.34.', 11);
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.467050', '2021-12-22 10:43:24.467050', '', '', '', 35, 'Sự thông báo', 1, '', NULL, NULL, 1, 0, 'F', '0', '0', 'system:notice:query', '#', '1.11.35.', 11);
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.468696', '2021-12-22 10:43:24.468696', '', '', '', 36, 'Sửa đổi thông báo', 3, '', NULL, NULL, 1, 0, 'F', '0', '0', 'system:notice:edit', '#', '1.11.36.', 11);
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.470360', '2021-12-22 10:43:24.470360', '', '', '', 37, 'Thông báo xóa', 4, '', NULL, NULL, 1, 0, 'F', '0', '0', 'system:notice:remove', '#', '1.11.37.', 11);
INSERT INTO `menu` VALUES ('2021-12-22 13:42:28.347454', '2021-12-22 13:42:28.000000', 'admin', 'admin', '', 38, 'Truy vấn công việc', 1, '', NULL, NULL, 1, 0, 'F', '0', '0', 'system:post:query', '#', '1.8.38.', 8);
INSERT INTO `menu` VALUES ('2021-12-22 13:42:49.571121', '2021-12-22 13:42:49.000000', 'admin', 'admin', '', 39, 'Bài viết mới', 2, '', NULL, NULL, 1, 0, 'F', '0', '0', 'system:post:add', '#', '1.8.39.', 8);
INSERT INTO `menu` VALUES ('2021-12-22 13:43:08.812751', '2021-12-22 13:43:08.000000', 'admin', 'admin', '', 40, 'Sửa đổi bài', 3, '', NULL, NULL, 1, 0, 'F', '0', '0', 'system:post:edit', '#', '1.8.40.', 8);
INSERT INTO `menu` VALUES ('2021-12-22 13:43:42.637215', '2021-12-22 13:43:42.000000', 'admin', 'admin', '', 41, 'Đăng xóa', 4, '', NULL, NULL, 1, 0, 'F', '0', '0', 'system:post:remove', '#', '1.8.41.', 8);
INSERT INTO `menu` VALUES ('2021-12-22 13:45:04.046592', '2021-12-22 13:45:04.000000', 'admin', 'admin', '', 42, 'Xuất khẩu', 5, '', NULL, NULL, 1, 0, 'F', '0', '0', 'system:post:export', '#', '1.8.42.', 8);
INSERT INTO `menu` VALUES ('2021-12-23 21:10:14.216043', '2021-12-23 21:10:14.000000', 'admin', 'admin', '', 43, 'Người dùng trực tuyến', 1, 'online', 'monitor/online/index', NULL, 1, 0, 'C', '0', '0', 'monitor:online:list', 'online', '2.43.', 2);
INSERT INTO `menu` VALUES ('2021-12-24 11:19:41.071246', '2021-12-24 11:19:41.000000', 'admin', 'admin', '', 44, 'Hình thức xây dựng', 1, 'build', 'tool/build/index', NULL, 1, 0, 'C', '0', '0', 'tool:build:list', 'build', '3.44.', 3);
INSERT INTO `menu` VALUES ('2021-12-24 11:20:27.949679', '2021-12-24 11:20:27.000000', 'admin', 'admin', '', 45, 'Giao diện hệ thống', 2, 'swagger', 'tool/swagger/index', NULL, 1, 0, 'C', '0', '0', 'tool:swagger:list', 'swagger', '3.45.', 3);
INSERT INTO `menu` VALUES ('2021-12-24 11:53:23.946743', '2021-12-24 11:53:23.000000', 'admin', 'admin', '', 46, 'Nhiệm vụ thời gian', 2, 'job', 'monitor/job/index', NULL, 1, 0, 'C', '0', '0', 'monitor:job:list', 'job', '2.46.', 2);
INSERT INTO `menu` VALUES ('2021-12-24 11:55:16.294232', '2021-12-24 11:55:16.000000', 'admin', 'admin', '', 48, 'Giám sát dịch vụ', 4, 'server', 'monitor/server/index', NULL, 1, 0, 'C', '0', '0', 'monitor:server:list', 'server', '2.48.', 2);
INSERT INTO `menu` VALUES ('2021-12-29 14:58:27.385651', '2021-12-29 14:58:27.000000', 'admin', 'admin', '', 49, 'Từ điển', 1, '', NULL, NULL, 1, 0, 'F', '0', '0', 'system:dict:query', '#', '1.9.49.', 9);
INSERT INTO `menu` VALUES ('2021-12-29 14:59:15.101581', '2021-12-29 14:59:15.000000', 'admin', 'admin', '', 50, 'Từ điển', 2, '', NULL, NULL, 1, 0, 'F', '0', '0', 'system:dict:add', '#', '1.9.50.', 9);
INSERT INTO `menu` VALUES ('2021-12-29 15:01:07.839872', '2021-12-29 15:01:07.000000', 'admin', 'admin', '', 51, 'Sửa đổi từ điển', 3, '', NULL, NULL, 1, 0, 'F', '0', '0', 'system:dict:edit', '#', '1.9.51.', 9);
INSERT INTO `menu` VALUES ('2021-12-29 15:03:36.875756', '2021-12-29 15:03:36.000000', 'admin', 'admin', '', 52, 'Xóa từ điển', 4, '', NULL, NULL, 1, 0, 'F', '0', '0', 'system:dict:remove', '#', '1.9.52.', 9);
INSERT INTO `menu` VALUES ('2021-12-29 15:06:53.986748', '2021-12-29 15:06:53.000000', 'admin', 'admin', '', 53, 'Xuất khẩu từ điển', 5, '', NULL, NULL, 1, 0, 'F', '0', '0', 'system:dict:export', '#', '1.9.53.', 9);
INSERT INTO `menu` VALUES ('2021-12-29 15:07:37.134365', '2021-12-29 15:07:37.000000', 'admin', 'admin', '', 54, 'Truy vấn tham số', 1, '', NULL, NULL, 1, 0, 'F', '0', '0', 'system:config:query', '#', '1.10.54.', 10);
INSERT INTO `menu` VALUES ('2021-12-29 15:15:50.914599', '2021-12-29 15:15:50.000000', 'admin', 'admin', '', 55, 'Tham số được thêm vào', 2, '', NULL, NULL, 1, 0, 'F', '0', '0', 'system:config:add', '#', '1.10.55.', 10);
INSERT INTO `menu` VALUES ('2021-12-29 15:29:36.089648', '2021-12-29 15:29:36.000000', 'admin', 'admin', '', 56, 'Sửa đổi tham số', 3, '', NULL, NULL, 1, 0, 'F', '0', '0', 'system:config:edit', '#', '1.10.56.', 10);
INSERT INTO `menu` VALUES ('2021-12-29 15:30:04.673290', '2021-12-29 15:30:04.000000', 'admin', 'admin', '', 57, 'Xóa tham số', 4, '', NULL, NULL, 1, 0, 'F', '0', '0', 'system:config:remove', '#', '1.10.57.', 10);
INSERT INTO `menu` VALUES ('2021-12-29 15:30:32.500905', '2021-12-29 15:30:32.000000', 'admin', 'admin', '', 58, 'Xuất tham số', 5, '', NULL, NULL, 1, 0, 'F', '0', '0', 'system:config:export', '#', '1.10.58.', 10);
INSERT INTO `menu` VALUES ('2021-12-29 15:31:40.135159', '2021-12-29 15:31:40.000000', 'admin', 'admin', '', 59, 'Truy vấn hoạt động', 1, '', NULL, NULL, 1, 0, 'F', '0', '0', 'monitor:operlog:query', '#', '1.12.13.59.', 13);
INSERT INTO `menu` VALUES ('2021-12-29 15:33:25.097943', '2021-12-29 15:33:25.000000', 'admin', 'admin', '', 60, 'Xóa bỏ', 2, '', NULL, NULL, 1, 0, 'F', '0', '0', 'monitor:operlog:remove', '#', '1.12.13.60.', 13);
INSERT INTO `menu` VALUES ('2021-12-29 15:33:57.738551', '2021-12-29 15:33:57.000000', 'admin', 'admin', '', 61, 'Xuất nhật ký', 4, '', NULL, NULL, 1, 0, 'F', '0', '0', 'monitor:operlog:export', '#', '1.12.13.61.', 13);
INSERT INTO `menu` VALUES ('2021-12-29 15:34:24.310074', '2021-12-29 15:34:24.000000', 'admin', 'admin', '', 62, 'Truy vấn đăng nhập', 1, '', NULL, NULL, 1, 0, 'F', '0', '0', 'monitor:logininfor:query', '#', '1.12.14.62.', 14);
INSERT INTO `menu` VALUES ('2021-12-29 15:34:36.220728', '2021-12-29 15:34:36.000000', 'admin', 'admin', '', 63, 'Xóa đăng nhập', 2, '', NULL, NULL, 1, 0, 'F', '0', '0', 'monitor:logininfor:remove', '#', '1.12.14.63.', 14);
INSERT INTO `menu` VALUES ('2021-12-29 15:34:46.269560', '2021-12-29 15:34:46.000000', 'admin', 'admin', '', 64, 'Xuất nhật ký', 3, '', NULL, NULL, 1, 0, 'F', '0', '0', 'monitor:logininfor:export', '#', '1.12.14.64.', 14);
INSERT INTO `menu` VALUES ('2021-12-29 15:35:26.165014', '2021-12-29 15:35:26.000000', 'admin', 'admin', '', 65, 'Tìm kiếm trực tuyến', 1, '', NULL, NULL, 1, 0, 'F', '0', '0', 'monitor:online:query', '#', '2.43.65.', 43);
INSERT INTO `menu` VALUES ('2021-12-29 15:35:40.022195', '2021-12-29 15:35:40.000000', 'admin', 'admin', '', 66, 'Lô hàng', 2, '', NULL, NULL, 1, 0, 'F', '0', '0', 'monitor:online:batchLogout', '#', '2.43.66.', 43);
INSERT INTO `menu` VALUES ('2021-12-29 15:35:50.997042', '2021-12-29 15:35:50.000000', 'admin', 'admin', '', 67, 'Phấn đấu', 3, '', NULL, NULL, 1, 0, 'F', '0', '0', 'monitor:online:forceLogout', '#', '2.43.67.', 43);
INSERT INTO `menu` VALUES ('2021-12-29 15:36:12.590058', '2021-12-29 15:36:12.000000', 'admin', 'admin', '', 68, 'Truy vấn nhiệm vụ', 1, '', NULL, NULL, 1, 0, 'F', '0', '0', 'monitor:job:query', '#', '2.46.68.', 46);
INSERT INTO `menu` VALUES ('2021-12-29 15:36:25.111759', '2021-12-29 15:36:25.000000', 'admin', 'admin', '', 69, 'Nhiệm vụ mới', 2, '', NULL, NULL, 1, 0, 'F', '0', '0', 'monitor:job:add', '#', '2.46.69.', 46);
INSERT INTO `menu` VALUES ('2021-12-29 15:36:36.070927', '2021-12-29 15:36:36.000000', 'admin', 'admin', '', 70, 'Sửa đổi nhiệm vụ', 3, '', NULL, NULL, 1, 0, 'F', '0', '0', '	 monitor:job:edit', '#', '2.46.70.', 46);
INSERT INTO `menu` VALUES ('2021-12-29 15:36:47.605200', '2021-12-29 15:37:14.000000', 'admin', 'admin', '', 71, 'Xóa nhiệm vụ', 4, '', NULL, NULL, 1, 0, 'F', '0', '0', 'monitor:job:remove', '#', '2.46.71.', 46);
INSERT INTO `menu` VALUES ('2021-12-29 15:36:57.920063', '2021-12-29 15:37:18.000000', 'admin', 'admin', '', 72, 'Sửa đổi nhà nước', 5, '', NULL, NULL, 1, 0, 'F', '0', '0', 'monitor:job:changeStatus', '#', '2.46.72.', 46);
INSERT INTO `menu` VALUES ('2021-12-29 15:37:31.201464', '2021-12-29 15:37:31.000000', 'admin', 'admin', '', 73, 'Xuất khẩu', 7, '', NULL, NULL, 1, 0, 'F', '0', '0', 'monitor:job:export', '#', '2.46.73.', 46);

-- ----------------------------
-- Table structure for notice
-- ----------------------------
DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice`  (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT 'Thời gian sáng tạo',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT 'Cập nhật thời gian',
  `create_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'người sáng lập',
  `update_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Cập nhật',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Nhận xét',
  `notice_id` int(0) NOT NULL AUTO_INCREMENT COMMENT 'Thông báo ID',
  `notice_title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Thông báo',
  `notice_type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT'Loại thông báo (1 thông báo 2 thông báo)',
  `notice_content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Nội dung thông báo',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT 'Trạng thái thông báo (0 bình thường 1 đã đóng)',
  PRIMARY KEY (`notice_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for oper_log
-- ----------------------------
DROP TABLE IF EXISTS `oper_log`;
CREATE TABLE `oper_log`  (
  `oper_id` int(0) NOT NULL AUTO_INCREMENT COMMENT 'Nhật ký khóa chính',
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Tiêu đề Mô-đun',
  `business_type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT 'Loại hình kinh doanh',
  `method` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Tên phương thức',
  `request_method` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Cách yêu cầu',
  `operator_type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT 'Danh mục hoạt động (0 người dùng nền khác 2 người dùng điện thoại di động)',
  `oper_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'nhà điều hành',
  `dept_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Tên bộ phận',
  `oper_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Yêu cầu url',
  `oper_ip` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Địa chỉ máy chủ',
  `oper_location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Nơi',
  `oper_param` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Tham số yêu cầu',
  `json_result` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Quay lại các tham số',
  `status` int(0) NOT NULL DEFAULT 0 COMMENT 'Trạng thái hoạt động (0 Bình thường 1 Ngoại lệ)',
  `errorMsg` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Trả về tham số',
  `oper_time` datetime(0) NOT NULL COMMENT 'Thời gian hoạt động',
  PRIMARY KEY (`oper_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for post
-- ----------------------------
DROP TABLE IF EXISTS `post`;
CREATE TABLE `post`  (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT 'Thời gian sáng tạo',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT 'Cập nhật thời gian',
  `create_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'người sáng lập',
  `update_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Cập nhật',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Nhận xét',
  `post_id` int(0) NOT NULL AUTO_INCREMENT COMMENT 'Đăng ID',
  `post_code` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Mã bài viết',
  `post_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Tên vị trí',
  `post_sort` int(0) NOT NULL COMMENT 'Hiển thị thứ tự',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Trạng thái (0 bình thường 1)',
  PRIMARY KEY (`post_id`) USING BTREE,
  UNIQUE INDEX `IDX_4365bf877a23182bde2156ec6e`(`post_code`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of post
-- ----------------------------
INSERT INTO `post` VALUES ('2022-01-06 13:39:28.615762', '2022-01-06 13:39:28.615762', 'admin', 'admin', '', 1, 'ceo', 'Chủ tịch', 1, '0');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT 'Thời gian sáng tạo',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT 'Cập nhật thời gian',
  `create_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'người sáng lập',
  `update_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Cập nhật',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Nhận xét',
  `role_id` int(0) NOT NULL AUTO_INCREMENT COMMENT 'ID ký tự',
  `role_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Tên vai',
  `role_key` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Chuỗi quyền ký tự',
  `role_sort` int(0) NOT NULL COMMENT 'Hiển thị thứ tự',
  `data_scope` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT 'Phạm vi dữ liệu (1: Tất cả các quyền dữ liệu 2: Quyền dữ liệu tùy chỉnh 3: Quyền dữ liệu của trụ sở 4: Quyền dữ liệu của bộ phận này và dưới 5: Chỉ có quyền dữ liệu của chúng tôi)',
  `menu_check_strictly` tinyint(0) NOT NULL DEFAULT 1 COMMENT 'Liệu mục lựa chọn cây menu có được liên kết hay không',
  `dept_check_strictly` tinyint(0) NOT NULL DEFAULT 1 COMMENT 'Liệu mục lựa chọn cây menu có được liên kết hay không',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Trạng thái ký tự (0 bình thường 1 điểm dừng)',
  `del_flag` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT 'Xóa (0 đại diện cho 2 đại diện cho xóa)',
  PRIMARY KEY (`role_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('2021-12-29 16:34:08.369206', '2022-01-06 13:38:18.155638', '', '', '', 1, 'Siêu quản trị viên', 'admin', 1, '1', 0, 1, '0', '0');

-- ----------------------------
-- Table structure for role_depts_dept
-- ----------------------------
DROP TABLE IF EXISTS `role_depts_dept`;
CREATE TABLE `role_depts_dept`  (
  `roleRoleId` int(0) NOT NULL,
  `deptDeptId` int(0) NOT NULL,
  PRIMARY KEY (`roleRoleId`, `deptDeptId`) USING BTREE,
  INDEX `IDX_c38adaee013585bdc3f36a4edc`(`roleRoleId`) USING BTREE,
  INDEX `IDX_a6df3f8f1af0e6fcd2424ff467`(`deptDeptId`) USING BTREE,
  CONSTRAINT `FK_a6df3f8f1af0e6fcd2424ff467c` FOREIGN KEY (`deptDeptId`) REFERENCES `dept` (`dept_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_c38adaee013585bdc3f36a4edcf` FOREIGN KEY (`roleRoleId`) REFERENCES `role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for role_menus_menu
-- ----------------------------
DROP TABLE IF EXISTS `role_menus_menu`;
CREATE TABLE `role_menus_menu`  (
  `roleRoleId` int(0) NOT NULL,
  `menuMenuId` int(0) NOT NULL,
  PRIMARY KEY (`roleRoleId`, `menuMenuId`) USING BTREE,
  INDEX `IDX_d770d9678ced1d5a050126672f`(`roleRoleId`) USING BTREE,
  INDEX `IDX_5b29b58ccc52b56f0a1ad62920`(`menuMenuId`) USING BTREE,
  CONSTRAINT `FK_5b29b58ccc52b56f0a1ad629209` FOREIGN KEY (`menuMenuId`) REFERENCES `menu` (`menu_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_d770d9678ced1d5a050126672fa` FOREIGN KEY (`roleRoleId`) REFERENCES `role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT 'Thời gian sáng tạo',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT 'Cập nhật thời gian',
  `create_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'người sáng lập',
  `update_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Cập nhật',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Nhận xét',
  `user_id` int(0) NOT NULL AUTO_INCREMENT COMMENT 'Tên người dùng',
  `user_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'tài khoản người dùng',
  `nick_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Biệt danh',
  `user_type` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '00' COMMENT 'Loại người dùng (00 Người dùng hệ thống)',
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Hộp thư người dùng',
  `phonenumber` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Số điện thoại di động',
  `sex` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT 'Giới tính của người dùng (0 nam, 1 nữ 2 không xác định)',
  `avatar` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Địa chỉ avatar',
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'mật khẩu mở khóa',
  `salt` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'Mã hóa muối',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT 'Trạng thái tài khoản (0 bình thường 1 dừng)',
  `del_flag` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT 'Xóa (0 đại diện cho 2 đại diện cho xóa)',
  `login_ip` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'IP đăng nhập cuối cùng',
  `login_date` datetime(0) DEFAULT NULL COMMENT 'Thời gian đăng nhập cuối cùng',
  `deptDeptId` int(0) DEFAULT NULL COMMENT 'ID bộ phận',
  PRIMARY KEY (`user_id`) USING BTREE,
  INDEX `FK_d61db9f4f5464b51df4bd6f2332`(`deptDeptId`) USING BTREE,
  CONSTRAINT `FK_d61db9f4f5464b51df4bd6f2332` FOREIGN KEY (`deptDeptId`) REFERENCES `dept` (`dept_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('2021-12-29 16:12:02.053561', '2022-01-06 13:42:55.000000', 'admin', 'admin', '', 1, 'admin', 'admin', '00', '87789771@qq.com', '13006133172', '0', '', '9c68fb331431f8dcfb7defef22b0c527', 'Y2uPc7hyq8Vi5qBc879Ut', '0', '0', '', NULL, 1);

-- ----------------------------
-- Table structure for user_posts_post
-- ----------------------------
DROP TABLE IF EXISTS `user_posts_post`;
CREATE TABLE `user_posts_post`  (
  `userUserId` int(0) NOT NULL,
  `postPostId` int(0) NOT NULL,
  PRIMARY KEY (`userUserId`, `postPostId`) USING BTREE,
  INDEX `IDX_28fca0ded6fc3ab66b451623f0`(`userUserId`) USING BTREE,
  INDEX `IDX_3511ec6a3e38572359525a8550`(`postPostId`) USING BTREE,
  CONSTRAINT `FK_28fca0ded6fc3ab66b451623f05` FOREIGN KEY (`userUserId`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_3511ec6a3e38572359525a85502` FOREIGN KEY (`postPostId`) REFERENCES `post` (`post_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_posts_post
-- ----------------------------
INSERT INTO `user_posts_post` VALUES (1, 1);

-- ----------------------------
-- Table structure for user_roles_role
-- ----------------------------
DROP TABLE IF EXISTS `user_roles_role`;
CREATE TABLE `user_roles_role`  (
  `userUserId` int(0) NOT NULL,
  `roleRoleId` int(0) NOT NULL,
  PRIMARY KEY (`userUserId`, `roleRoleId`) USING BTREE,
  INDEX `IDX_0bd606ba8531dd93b457b8486d`(`userUserId`) USING BTREE,
  INDEX `IDX_56f8ede2f2e059d4db74591c53`(`roleRoleId`) USING BTREE,
  CONSTRAINT `FK_0bd606ba8531dd93b457b8486d9` FOREIGN KEY (`userUserId`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_56f8ede2f2e059d4db74591c533` FOREIGN KEY (`roleRoleId`) REFERENCES `role` (`role_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_roles_role
-- ----------------------------
INSERT INTO `user_roles_role` VALUES (1, 1);

SET FOREIGN_KEY_CHECKS = 1;
