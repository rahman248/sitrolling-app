import {
	ClockCircleOutlined,
	CheckOutlined,
	UsergroupDeleteOutlined,
	RocketOutlined,
	NotificationFilled,
	TrophyFilled,
	SubnodeOutlined,
	CalendarOutlined,
	FileDoneOutlined,
	PieChartFilled,
	FileOutlined,
	FlagFilled,
	HomeOutlined,
	SettingOutlined,
	UnorderedListOutlined,
	UsergroupAddOutlined,
	UserOutlined,
	UserSwitchOutlined,
	WalletOutlined,
	FileSyncOutlined,
	FlagOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { disable } from "workbox-navigation-preload";
import getPermissions from "../../utils/getPermissions";
import getUserFromToken from "../../utils/getUserFromToken";
// import styles from "./Sidenav.module.css";

const Sidenav = ({ color, sideNavOpenKeys }) => {
	const user = getUserFromToken();
	const permissions = getPermissions();
	const hasPermission = (item) => {
		return permissions?.includes(item ? item : "");
	};
	// console.log("haspermission", hasPermission("create-user"));
	const menu = [
		{
			label: (
				<NavLink to='/admin/dashboard'>
					<span>Dashboard</span>
				</NavLink>
			),
			key: "dashboard",
			icon: <HomeOutlined />,
		},

		(hasPermission("create-user") ||
			hasPermission("readAll-user") ||
			hasPermission("readAll-role") ||
			hasPermission("readAll-designation") ||
			hasPermission("readAll-department")) && {
			label: "PETUGAS",
			key: "hr",
			icon: <UserOutlined />,
			children: [
				hasPermission("create-user") && {
					label: (
						<NavLink to='/admin/hr/staffs/new'>
							<span>Tambah Petugas</span>
						</NavLink>
					),

					key: "staffs",
					icon: <UsergroupAddOutlined />,
				},
				hasPermission("readAll-user") && {
					label: (
						<NavLink to='/admin/hr/staffs'>
							<span>Daftar Petugas</span>
						</NavLink>
					),
					key: "users",
					icon: <UsergroupAddOutlined />,
				},
				hasPermission("readAll-role") && {
					label: (
						<NavLink to='/admin/role'>
							<span>Role & Permissions</span>
						</NavLink>
					),
					key: "roleAndPermissions",
					icon: <UserSwitchOutlined />,
				},
				hasPermission("readAll-designation") && {
					label: (
						<NavLink to='/admin/designation/'>
							<span>Designation</span>
						</NavLink>
					),
					key: "designation",
					icon: <UserSwitchOutlined />,
				},
				hasPermission("readAll-department") && {
					label: (
						<NavLink to='/admin/department'>
							<span>Department</span>
						</NavLink>
					),
					key: "department",
					icon: <UserSwitchOutlined />,
				},
			],
		},

		(hasPermission("create-attendance") ||
			hasPermission("readAll-attendance")) && {
			label: "ATTENDANCE",
			key: "attendance",
			icon: <ClockCircleOutlined />,
			children: [
				hasPermission("create-attendance") && {
					label: (
						<NavLink to='/admin/attendance'>
							<span>Attendance</span>
						</NavLink>
					),
					key: "attendance",
					icon: <FileDoneOutlined />,
				},
				hasPermission("readSingle-attendance") && {
					label: (
						<NavLink to={`/admin/attendance/user/${user}`}>
							<span>My Attendance</span>
						</NavLink>
					),
					key: "myAttendance",
					icon: <FileDoneOutlined />,
				},
			],
		},

		hasPermission("readAll-shift") && {
			label: "SHIFT",
			key: "shift",
			icon: <ClockCircleOutlined />,
			children: [
				hasPermission("readAll-shift") && {
					label: (
						<NavLink to='/admin/shift'>
							<span>Shift</span>
						</NavLink>
					),
					key: "newShift",
					icon: <FileDoneOutlined />,
				},
			],
		},

		hasPermission("readAll-employmentStatus") && {
			label: "STATUS PETUGAS",
			key: "employementStatus",
			icon: <RocketOutlined />,
			children: [
				hasPermission("readAll-employmentStatus") && {
					label: (
						<NavLink to='/admin/employment-status'>
							<span>Status</span>
						</NavLink>
					),
					key: "employementStatus",
					icon: <FileDoneOutlined />,
				},
			],
		},

		(hasPermission("create-leaveApplication") ||
			hasPermission("readAll-leaveApplication") ||
			hasPermission("readSingle-leaveApplication")) && {
			label: "IZIN ",
			key: "leave",
			icon: <UsergroupDeleteOutlined />,
			children: [
				hasPermission("create-leaveApplication") && {
					label: (
						<NavLink to='/admin/leave/new'>
							<span> New Leave </span>
						</NavLink>
					),
					key: "newLeave",
					icon: <SubnodeOutlined />,
				},
				hasPermission("readAll-leaveApplication") && {
					label: (
						<NavLink to='/admin/leave'>
							<span>Leave Status</span>
						</NavLink>
					),
					key: "leaveStatus",
					icon: <FileDoneOutlined />,
				},
				hasPermission("readSingle-leaveApplication") && {
					label: (
						<NavLink to={`/admin/leave/user/${user}`}>
							<span>My Leaves</span>
						</NavLink>
					),
					key: "myLeaves",
					icon: <FileDoneOutlined />,
				},
			],
		},

		(hasPermission("readAll-weeklyHoliday") ||
			hasPermission("readAll-publicHoliday")) && {
			label: "LIBUR",
			key: "holiday",
			icon: <CalendarOutlined />,
			children: [
				hasPermission("readAll-weeklyHoliday") && {
					label: (
						<NavLink to='/admin/holiday/week'>
							<span>Libur Mingguan</span>
						</NavLink>
					),
					key: "weeklyHoliday",
					icon: <PieChartFilled />,
				},
				hasPermission("readAll-publicHoliday") && {
					label: (
						<NavLink to='/admin/holiday/public'>
							<span>Libur Nasional</span>
						</NavLink>
					),
					key: "publicHoliday",
					icon: <PieChartFilled />,
				},
			],
		},

		hasPermission("readAll-leavePolicy") && {
			label: "PERIZINAN",
			key: "leavePolicy",
			icon: <CalendarOutlined />,
			children: [
				hasPermission("readAll-leavePolicy") && {
					label: (
						<NavLink to='/admin/leave-policy'>
							<span>Kebijakan Izin</span>
						</NavLink>
					),
					key: "leavePolicy",
					icon: <PieChartFilled />,
				},
			],
		},

		hasPermission("readAll-announcement") && {
			label: "PENGUMUMAN",
			key: "announcement",
			icon: <NotificationFilled />,
			children: [
				hasPermission("readAll-announcement") && {
					label: (
						<NavLink to='/admin/announcement'>
							<span>Announcement</span>
						</NavLink>
					),
					key: "newLeave",
					icon: <FlagFilled />,
				},
			],
		},



		(hasPermission("create-project") ||
			hasPermission("readAll-project") ||
			hasPermission("create-projectTeam") ||
			hasPermission("create-milestone") ||
			hasPermission("readAll-priority") ||
			hasPermission("create-task-Status")) && {
			label: "JADWAL",
			key: "project",
			icon: <SettingOutlined />,
			children: [
				hasPermission("create-project") && {
					label: (
						<NavLink to='/admin/project/new'>
							<span>Tambah Jadwal</span>
						</NavLink>
					),
					key: "project",
					icon: <SettingOutlined />,
				},
				hasPermission("readAll-project") && {
					label: (
						<NavLink to='/admin/project'>
							<span>Semua Jadwal</span>
						</NavLink>
					),
					key: "allProject",
					icon: <SettingOutlined />,
				},
				hasPermission("create-projectTeam") && {
					label: (
						<NavLink to='/admin/team'>
							<span>Tim</span>
						</NavLink>
					),
					key: "team",
					icon: <SettingOutlined />,
				},
				(hasPermission("create-priority") ||
					hasPermission("readAll-priority")) && {
					label: (
						<NavLink to='/admin/task-priority'>
							<span>Tugas Prioritas</span>
						</NavLink>
					),
					key: "taskPriority",
					icon: <SettingOutlined />,
				},
				hasPermission("create-milestone") && {
					label: (
						<NavLink to='/admin/milestone'>
							<span>Add Milestone</span>
						</NavLink>
					),
					key: "milestone",
					icon: <SettingOutlined />,
				},

				hasPermission("create-taskStatus") && {
					label: (
						<NavLink to='/admin/task-status'>
							<span>Tambah Status Tugas</span>
						</NavLink>
					),
					key: "taskStatus",
					icon: <SettingOutlined />,
				},
			],
		},

		hasPermission("readAll-setting") && {
			label: "PENGATURAN",
			key: "settings",
			icon: <SettingOutlined />,
			children: [
				hasPermission("readAll-setting") && {
					label: (
						<NavLink to='/admin/company-setting'>
							<span>Pengaturan Instansi</span>
						</NavLink>
					),
					key: "invoiceSetting",
					icon: <SettingOutlined />,
				},
			],
		},
	];

	return (
		<div>
			<Menu
				theme='dark'
				mode='inline'
				items={menu}
				className='sidenav-menu '
				// openKeys={[sideNavOpenKeys]}
				// style={{ backgroundColor: "transparent" }}
			/>
		</div>
	);
};

export default Sidenav;
