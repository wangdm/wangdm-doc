/*
Menu
*/
INSERT INTO `Menu` (`display`,`idx`,`lang`,`name`,`icon`,`parent_id`,`perm`,`url`) VALUES (1,1,'cn','项目管理','el-icon-application',0,'','');
INSERT INTO `Menu` (`display`,`idx`,`lang`,`name`,`icon`,`parent_id`,`perm`,`url`) VALUES (1,2,'cn','账户管理','el-icon-account',0,'','');
INSERT INTO `Menu` (`display`,`idx`,`lang`,`name`,`icon`,`parent_id`,`perm`,`url`) VALUES (1,3,'cn','系统权限','el-icon-perm',0,'','');
INSERT INTO `Menu` (`display`,`idx`,`lang`,`name`,`icon`,`parent_id`,`perm`,`url`) VALUES (1,4,'cn','系统日志','el-icon-log',0,'','');
INSERT INTO `Menu` (`display`,`idx`,`lang`,`name`,`icon`,`parent_id`,`perm`,`url`) VALUES (1,5,'cn','系统设置','el-icon-setting',0,'','');
INSERT INTO `Menu` (`display`,`idx`,`lang`,`name`,`icon`,`parent_id`,`perm`,`url`) VALUES (1,1,'cn','项目列表','',1,'','/project/list');
INSERT INTO `Menu` (`display`,`idx`,`lang`,`name`,`icon`,`parent_id`,`perm`,`url`) VALUES (1,2,'cn','审核项目','',1,'','/project/verify');
INSERT INTO `Menu` (`display`,`idx`,`lang`,`name`,`icon`,`parent_id`,`perm`,`url`) VALUES (1,3,'cn','已删项目','',1,'','/project/delete');
INSERT INTO `Menu` (`display`,`idx`,`lang`,`name`,`icon`,`parent_id`,`perm`,`url`) VALUES (1,1,'cn','账户列表','',2,'','/account/list');
INSERT INTO `Menu` (`display`,`idx`,`lang`,`name`,`icon`,`parent_id`,`perm`,`url`) VALUES (1,2,'cn','审核账户','',2,'','/account/verify');
INSERT INTO `Menu` (`display`,`idx`,`lang`,`name`,`icon`,`parent_id`,`perm`,`url`) VALUES (1,3,'cn','已删账户','',2,'','/account/delete');
INSERT INTO `Menu` (`display`,`idx`,`lang`,`name`,`icon`,`parent_id`,`perm`,`url`) VALUES (1,4,'cn','登录记录','',2,'','/account/login');
INSERT INTO `Menu` (`display`,`idx`,`lang`,`name`,`icon`,`parent_id`,`perm`,`url`) VALUES (1,1,'cn','系统用户','',3,'','/user/user');
INSERT INTO `Menu` (`display`,`idx`,`lang`,`name`,`icon`,`parent_id`,`perm`,`url`) VALUES (1,2,'cn','系统角色','',3,'','/user/role');
INSERT INTO `Menu` (`display`,`idx`,`lang`,`name`,`icon`,`parent_id`,`perm`,`url`) VALUES (1,1,'cn','操作日志','',4,'','/system/log/operate');
INSERT INTO `Menu` (`display`,`idx`,`lang`,`name`,`icon`,`parent_id`,`perm`,`url`) VALUES (1,2,'cn','登录日志','',4,'','/system/log/login');
INSERT INTO `Menu` (`display`,`idx`,`lang`,`name`,`icon`,`parent_id`,`perm`,`url`) VALUES (1,2,'cn','访问日志','',4,'','/system/log/visit');
INSERT INTO `Menu` (`display`,`idx`,`lang`,`name`,`icon`,`parent_id`,`perm`,`url`) VALUES (1,1,'cn','数据字典','',5,'','/system/dict');
INSERT INTO `Menu` (`display`,`idx`,`lang`,`name`,`icon`,`parent_id`,`perm`,`url`) VALUES (1,2,'cn','导航菜单','',5,'','/system/nav');

/*
PermissionGroup
*/
INSERT INTO `PermissionGroup` (`description`,`name`,) VALUES (NULL,'项目管理');
INSERT INTO `PermissionGroup` (`description`,`name`,) VALUES (NULL,'用户管理');
INSERT INTO `PermissionGroup` (`description`,`name`,) VALUES (NULL,'权限管理');
INSERT INTO `PermissionGroup` (`description`,`name`,) VALUES (NULL,'系统日志');
INSERT INTO `PermissionGroup` (`description`,`name`,) VALUES (NULL,'系统设置');

/*
Permission
*/
INSERT INTO `Permission` (`description`,`name`,`title`,`groupId`) VALUES (NULL,'project:create','添加应用',1);
INSERT INTO `Permission` (`description`,`name`,`title`,`groupId`) VALUES (NULL,'project:update','修改应用',1);
INSERT INTO `Permission` (`description`,`name`,`title`,`groupId`) VALUES (NULL,'project:delete','删除应用',1);
INSERT INTO `Permission` (`description`,`name`,`title`,`groupId`) VALUES (NULL,'project:view','查看应用',1);
INSERT INTO `Permission` (`description`,`name`,`title`,`groupId`) VALUES (NULL,'account:create','添加帐户',2);
INSERT INTO `Permission` (`description`,`name`,`title`,`groupId`) VALUES (NULL,'account:update','修改帐户',2);
INSERT INTO `Permission` (`description`,`name`,`title`,`groupId`) VALUES (NULL,'account:delete','删除帐户',2);
INSERT INTO `Permission` (`description`,`name`,`title`,`groupId`) VALUES (NULL,'account:view','查看帐户',2);
INSERT INTO `Permission` (`description`,`name`,`title`,`groupId`) VALUES (NULL,'account:log:login:view','查看用户登录记录',2);
INSERT INTO `Permission` (`description`,`name`,`title`,`groupId`) VALUES (NULL,'account:log:login:delete','删除用户登录记录',2);
INSERT INTO `Permission` (`description`,`name`,`title`,`groupId`) VALUES (NULL,'user:create','添加用户',3);
INSERT INTO `Permission` (`description`,`name`,`title`,`groupId`) VALUES (NULL,'user:update','修改用户',3);
INSERT INTO `Permission` (`description`,`name`,`title`,`groupId`) VALUES (NULL,'user:delete','删除用户',3);
INSERT INTO `Permission` (`description`,`name`,`title`,`groupId`) VALUES (NULL,'user:view','查看用户',3);
INSERT INTO `Permission` (`description`,`name`,`title`,`groupId`) VALUES (NULL,'user:role:view','查看用户角色',3);
INSERT INTO `Permission` (`description`,`name`,`title`,`groupId`) VALUES (NULL,'user:role:modify','修改用户角色',3);
INSERT INTO `Permission` (`description`,`name`,`title`,`groupId`) VALUES (NULL,'role:create','添加角色',3);
INSERT INTO `Permission` (`description`,`name`,`title`,`groupId`) VALUES (NULL,'role:update','修改角色',3);
INSERT INTO `Permission` (`description`,`name`,`title`,`groupId`) VALUES (NULL,'role:delete','删除角色',3);
INSERT INTO `Permission` (`description`,`name`,`title`,`groupId`) VALUES (NULL,'role:view','查看角色',3);
INSERT INTO `Permission` (`description`,`name`,`title`,`groupId`) VALUES (NULL,'role:perm:view','查看角色权限',3);
INSERT INTO `Permission` (`description`,`name`,`title`,`groupId`) VALUES (NULL,'role:perm:modify','修改角色权限',3);
INSERT INTO `Permission` (`description`,`name`,`title`,`groupId`) VALUES (NULL,'role:menu:view','查看角色菜单',3);
INSERT INTO `Permission` (`description`,`name`,`title`,`groupId`) VALUES (NULL,'role:menu:modify','修改角色菜单',3);
INSERT INTO `Permission` (`description`,`name`,`title`,`groupId`) VALUES (NULL,'system:log:login:view','查看登录记录',4);
INSERT INTO `Permission` (`description`,`name`,`title`,`groupId`) VALUES (NULL,'system:log:login:delete','删除登录记录',4);
INSERT INTO `Permission` (`description`,`name`,`title`,`groupId`) VALUES (NULL,'system:log:operate:view','查看操作记录',4);
INSERT INTO `Permission` (`description`,`name`,`title`,`groupId`) VALUES (NULL,'system:log:operate:delete','删除操作记录',4);
INSERT INTO `Permission` (`description`,`name`,`title`,`groupId`) VALUES (NULL,'system:log:visit:view','查看访问记录',4);
INSERT INTO `Permission` (`description`,`name`,`title`,`groupId`) VALUES (NULL,'system:log:visit:delete','删除访问记录',4);
INSERT INTO `Permission` (`description`,`name`,`title`,`groupId`) VALUES (NULL,'system:dict:create','添加字典项',5);
INSERT INTO `Permission` (`description`,`name`,`title`,`groupId`) VALUES (NULL,'system:dict:update','修改字典项',5);
INSERT INTO `Permission` (`description`,`name`,`title`,`groupId`) VALUES (NULL,'system:dict:delete','删除字典项',5);
INSERT INTO `Permission` (`description`,`name`,`title`,`groupId`) VALUES (NULL,'system:dict:view','查看字典',5);
INSERT INTO `Permission` (`description`,`name`,`title`,`groupId`) VALUES (NULL,'system:nav:create','添加导航',5);
INSERT INTO `Permission` (`description`,`name`,`title`,`groupId`) VALUES (NULL,'system:nav:update','修改导航',5);
INSERT INTO `Permission` (`description`,`name`,`title`,`groupId`) VALUES (NULL,'system:nav:delete','删除导航',5);
INSERT INTO `Permission` (`description`,`name`,`title`,`groupId`) VALUES (NULL,'system:nav:view','查看导航',5);

/*
Role
*/
INSERT INTO `Role` (`description`,`name`,`title`,`type`) VALUES ('系统同管理员，拥有所有权限','administrator','管理员',0);

/*
RoleMenu
*/
INSERT INTO `RoleMenu` (`menuId`,`roleId`) VALUES (1,1);
INSERT INTO `RoleMenu` (`menuId`,`roleId`) VALUES (2,1);
INSERT INTO `RoleMenu` (`menuId`,`roleId`) VALUES (3,1);
INSERT INTO `RoleMenu` (`menuId`,`roleId`) VALUES (4,1);
INSERT INTO `RoleMenu` (`menuId`,`roleId`) VALUES (5,1);
INSERT INTO `RoleMenu` (`menuId`,`roleId`) VALUES (6,1);
INSERT INTO `RoleMenu` (`menuId`,`roleId`) VALUES (7,1);
INSERT INTO `RoleMenu` (`menuId`,`roleId`) VALUES (8,1);
INSERT INTO `RoleMenu` (`menuId`,`roleId`) VALUES (9,1);
INSERT INTO `RoleMenu` (`menuId`,`roleId`) VALUES (10,1);
INSERT INTO `RoleMenu` (`menuId`,`roleId`) VALUES (11,1);
INSERT INTO `RoleMenu` (`menuId`,`roleId`) VALUES (12,1);
INSERT INTO `RoleMenu` (`menuId`,`roleId`) VALUES (13,1);
INSERT INTO `RoleMenu` (`menuId`,`roleId`) VALUES (14,1);
INSERT INTO `RoleMenu` (`menuId`,`roleId`) VALUES (15,1);
INSERT INTO `RoleMenu` (`menuId`,`roleId`) VALUES (16,1);
INSERT INTO `RoleMenu` (`menuId`,`roleId`) VALUES (17,1);
INSERT INTO `RoleMenu` (`menuId`,`roleId`) VALUES (18,1);
INSERT INTO `RoleMenu` (`menuId`,`roleId`) VALUES (19,1);

/*
RolePermission
*/
INSERT INTO `RolePermission` (`permissionId`,`roleId`) VALUES (1,1);
INSERT INTO `RolePermission` (`permissionId`,`roleId`) VALUES (2,1);
INSERT INTO `RolePermission` (`permissionId`,`roleId`) VALUES (3,1);
INSERT INTO `RolePermission` (`permissionId`,`roleId`) VALUES (4,1);
INSERT INTO `RolePermission` (`permissionId`,`roleId`) VALUES (5,1);
INSERT INTO `RolePermission` (`permissionId`,`roleId`) VALUES (6,1);
INSERT INTO `RolePermission` (`permissionId`,`roleId`) VALUES (7,1);
INSERT INTO `RolePermission` (`permissionId`,`roleId`) VALUES (8,1);
INSERT INTO `RolePermission` (`permissionId`,`roleId`) VALUES (9,1);
INSERT INTO `RolePermission` (`permissionId`,`roleId`) VALUES (10,1);
INSERT INTO `RolePermission` (`permissionId`,`roleId`) VALUES (11,1);
INSERT INTO `RolePermission` (`permissionId`,`roleId`) VALUES (12,1);
INSERT INTO `RolePermission` (`permissionId`,`roleId`) VALUES (13,1);
INSERT INTO `RolePermission` (`permissionId`,`roleId`) VALUES (14,1);
INSERT INTO `RolePermission` (`permissionId`,`roleId`) VALUES (15,1);
INSERT INTO `RolePermission` (`permissionId`,`roleId`) VALUES (16,1);
INSERT INTO `RolePermission` (`permissionId`,`roleId`) VALUES (17,1);
INSERT INTO `RolePermission` (`permissionId`,`roleId`) VALUES (18,1);
INSERT INTO `RolePermission` (`permissionId`,`roleId`) VALUES (19,1);
INSERT INTO `RolePermission` (`permissionId`,`roleId`) VALUES (20,1);
INSERT INTO `RolePermission` (`permissionId`,`roleId`) VALUES (21,1);
INSERT INTO `RolePermission` (`permissionId`,`roleId`) VALUES (22,1);
INSERT INTO `RolePermission` (`permissionId`,`roleId`) VALUES (23,1);
INSERT INTO `RolePermission` (`permissionId`,`roleId`) VALUES (24,1);
INSERT INTO `RolePermission` (`permissionId`,`roleId`) VALUES (25,1);
INSERT INTO `RolePermission` (`permissionId`,`roleId`) VALUES (26,1);
INSERT INTO `RolePermission` (`permissionId`,`roleId`) VALUES (27,1);
INSERT INTO `RolePermission` (`permissionId`,`roleId`) VALUES (28,1);
INSERT INTO `RolePermission` (`permissionId`,`roleId`) VALUES (29,1);
INSERT INTO `RolePermission` (`permissionId`,`roleId`) VALUES (30,1);
INSERT INTO `RolePermission` (`permissionId`,`roleId`) VALUES (31,1);
INSERT INTO `RolePermission` (`permissionId`,`roleId`) VALUES (32,1);
INSERT INTO `RolePermission` (`permissionId`,`roleId`) VALUES (33,1);
INSERT INTO `RolePermission` (`permissionId`,`roleId`) VALUES (34,1);
INSERT INTO `RolePermission` (`permissionId`,`roleId`) VALUES (35,1);
INSERT INTO `RolePermission` (`permissionId`,`roleId`) VALUES (36,1);
INSERT INTO `RolePermission` (`permissionId`,`roleId`) VALUES (37,1);
INSERT INTO `RolePermission` (`permissionId`,`roleId`) VALUES (38,1);

/*
User
*/
INSERT INTO `User` (`email`,`fullname`,`password`,`phone`,`username`) VALUES ('phight@163.com','Administrator','admin','13077895475','admin');

/*
UserRole
*/
INSERT INTO `UserRole` (`roleId`,`userId`) VALUES (1,1);

/*
Account
*/
INSERT INTO `Account` (`phone`,`email`,`fullname`,`password`,`status`,`create_time`,`update_time`) VALUES ('13077895475','phight@163.com','测试','123456','1','2019-02-24 20:56:57','2019-04-23 11:03:20');
