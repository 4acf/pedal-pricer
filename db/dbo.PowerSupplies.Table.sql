USE [pedalpricer]
GO
/****** Object:  Table [dbo].[PowerSupplies]    Script Date: 4/3/2024 7:39:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PowerSupplies](
	[PowerSupplyID] [int] IDENTITY(1,1) NOT NULL,
	[PowerSupplyBrand] [nvarchar](500) NULL,
	[PowerSupplyName] [nvarchar](500) NULL,
	[PowerSupplyWidth] [decimal](5, 3) NULL,
	[PowerSupplyHeight] [decimal](4, 3) NULL,
	[PowerSupplyPrice] [decimal](5, 2) NULL,
	[PowerSupplyImageFileName] [nvarchar](500) NULL
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[PowerSupplies] ON 

INSERT [dbo].[PowerSupplies] ([PowerSupplyID], [PowerSupplyBrand], [PowerSupplyName], [PowerSupplyWidth], [PowerSupplyHeight], [PowerSupplyPrice], [PowerSupplyImageFileName]) VALUES (1, N'T-Rex Engineering', N'Fuel Tank Chameleon', CAST(6.300 AS Decimal(5, 3)), CAST(3.200 AS Decimal(4, 3)), CAST(189.00 AS Decimal(5, 2)), N't-rex-engineering-fuel-tank-chameleon.png')
INSERT [dbo].[PowerSupplies] ([PowerSupplyID], [PowerSupplyBrand], [PowerSupplyName], [PowerSupplyWidth], [PowerSupplyHeight], [PowerSupplyPrice], [PowerSupplyImageFileName]) VALUES (1019, N'Strymon', N'Zuma', CAST(6.800 AS Decimal(5, 3)), CAST(3.300 AS Decimal(4, 3)), CAST(279.00 AS Decimal(5, 2)), N'strymon-zuma.png')
INSERT [dbo].[PowerSupplies] ([PowerSupplyID], [PowerSupplyBrand], [PowerSupplyName], [PowerSupplyWidth], [PowerSupplyHeight], [PowerSupplyPrice], [PowerSupplyImageFileName]) VALUES (1020, N'Strymon', N'Zuma R300', CAST(6.800 AS Decimal(5, 3)), CAST(3.300 AS Decimal(4, 3)), CAST(229.00 AS Decimal(5, 2)), N'strymon-zumar300.png')
INSERT [dbo].[PowerSupplies] ([PowerSupplyID], [PowerSupplyBrand], [PowerSupplyName], [PowerSupplyWidth], [PowerSupplyHeight], [PowerSupplyPrice], [PowerSupplyImageFileName]) VALUES (1021, N'Strymon', N'Ojai', CAST(3.200 AS Decimal(5, 3)), CAST(2.300 AS Decimal(4, 3)), CAST(169.00 AS Decimal(5, 2)), N'strymon-ojai.png')
INSERT [dbo].[PowerSupplies] ([PowerSupplyID], [PowerSupplyBrand], [PowerSupplyName], [PowerSupplyWidth], [PowerSupplyHeight], [PowerSupplyPrice], [PowerSupplyImageFileName]) VALUES (1022, N'Strymon', N'Ojai R30', CAST(5.100 AS Decimal(5, 3)), CAST(2.300 AS Decimal(4, 3)), CAST(189.00 AS Decimal(5, 2)), N'strymon-ojai-r30.png')
INSERT [dbo].[PowerSupplies] ([PowerSupplyID], [PowerSupplyBrand], [PowerSupplyName], [PowerSupplyWidth], [PowerSupplyHeight], [PowerSupplyPrice], [PowerSupplyImageFileName]) VALUES (1023, N'Voodoo Lab', N'Pedal Power 2+', CAST(6.000 AS Decimal(5, 3)), CAST(3.400 AS Decimal(4, 3)), CAST(199.99 AS Decimal(5, 2)), N'voodoolab-pp2.png')
INSERT [dbo].[PowerSupplies] ([PowerSupplyID], [PowerSupplyBrand], [PowerSupplyName], [PowerSupplyWidth], [PowerSupplyHeight], [PowerSupplyPrice], [PowerSupplyImageFileName]) VALUES (1024, N'Voodoo Lab', N'Pedal Power 4x4', CAST(7.000 AS Decimal(5, 3)), CAST(3.400 AS Decimal(4, 3)), CAST(199.99 AS Decimal(5, 2)), N'voodoolab-4x4.png')
INSERT [dbo].[PowerSupplies] ([PowerSupplyID], [PowerSupplyBrand], [PowerSupplyName], [PowerSupplyWidth], [PowerSupplyHeight], [PowerSupplyPrice], [PowerSupplyImageFileName]) VALUES (1025, N'Voodoo Lab', N'Pedal Power Digital', CAST(4.900 AS Decimal(5, 3)), CAST(3.400 AS Decimal(4, 3)), CAST(139.99 AS Decimal(5, 2)), N'voodoolab-digital.png')
INSERT [dbo].[PowerSupplies] ([PowerSupplyID], [PowerSupplyBrand], [PowerSupplyName], [PowerSupplyWidth], [PowerSupplyHeight], [PowerSupplyPrice], [PowerSupplyImageFileName]) VALUES (1026, N'Voodoo Lab', N'Pedal Power ISO 5', CAST(4.900 AS Decimal(5, 3)), CAST(3.400 AS Decimal(4, 3)), CAST(139.99 AS Decimal(5, 2)), N'voodoolab-iso5.png')
INSERT [dbo].[PowerSupplies] ([PowerSupplyID], [PowerSupplyBrand], [PowerSupplyName], [PowerSupplyWidth], [PowerSupplyHeight], [PowerSupplyPrice], [PowerSupplyImageFileName]) VALUES (1027, N'Voodoo Lab', N'Pedal Power Mondo', CAST(10.700 AS Decimal(5, 3)), CAST(3.400 AS Decimal(4, 3)), CAST(279.99 AS Decimal(5, 2)), N'voodoolab-mondo.png')
INSERT [dbo].[PowerSupplies] ([PowerSupplyID], [PowerSupplyBrand], [PowerSupplyName], [PowerSupplyWidth], [PowerSupplyHeight], [PowerSupplyPrice], [PowerSupplyImageFileName]) VALUES (1028, N'Effects Bakery', N'Power Supply Hoden Sentai Donuts', CAST(3.700 AS Decimal(5, 3)), CAST(1.520 AS Decimal(4, 3)), CAST(69.99 AS Decimal(5, 2)), N'effectsbakery-power-supply-donuts.png')
INSERT [dbo].[PowerSupplies] ([PowerSupplyID], [PowerSupplyBrand], [PowerSupplyName], [PowerSupplyWidth], [PowerSupplyHeight], [PowerSupplyPrice], [PowerSupplyImageFileName]) VALUES (1029, N'Joyo', N'JP-02 Power Supply 2', CAST(5.900 AS Decimal(5, 3)), CAST(2.140 AS Decimal(4, 3)), CAST(49.99 AS Decimal(5, 2)), N'joyo-jp02.png')
INSERT [dbo].[PowerSupplies] ([PowerSupplyID], [PowerSupplyBrand], [PowerSupplyName], [PowerSupplyWidth], [PowerSupplyHeight], [PowerSupplyPrice], [PowerSupplyImageFileName]) VALUES (1030, N'Joyo', N'JP-05 Power Supply 5', CAST(5.750 AS Decimal(5, 3)), CAST(2.700 AS Decimal(4, 3)), CAST(69.00 AS Decimal(5, 2)), N'joyo-jp05.png')
INSERT [dbo].[PowerSupplies] ([PowerSupplyID], [PowerSupplyBrand], [PowerSupplyName], [PowerSupplyWidth], [PowerSupplyHeight], [PowerSupplyPrice], [PowerSupplyImageFileName]) VALUES (1031, N'Mono', N'Power Supply (Large)', CAST(11.710 AS Decimal(5, 3)), CAST(2.260 AS Decimal(4, 3)), CAST(229.00 AS Decimal(5, 2)), N'mono-power-supply-large.png')
INSERT [dbo].[PowerSupplies] ([PowerSupplyID], [PowerSupplyBrand], [PowerSupplyName], [PowerSupplyWidth], [PowerSupplyHeight], [PowerSupplyPrice], [PowerSupplyImageFileName]) VALUES (1032, N'Mono', N'Power Supply (Medium)', CAST(8.000 AS Decimal(5, 3)), CAST(2.260 AS Decimal(4, 3)), CAST(179.00 AS Decimal(5, 2)), N'mono-power-supply-medium.png')
INSERT [dbo].[PowerSupplies] ([PowerSupplyID], [PowerSupplyBrand], [PowerSupplyName], [PowerSupplyWidth], [PowerSupplyHeight], [PowerSupplyPrice], [PowerSupplyImageFileName]) VALUES (1033, N'Mono', N'Power Supply (Small)', CAST(5.620 AS Decimal(5, 3)), CAST(2.200 AS Decimal(4, 3)), CAST(129.00 AS Decimal(5, 2)), N'mono-power-supply-small.png')
INSERT [dbo].[PowerSupplies] ([PowerSupplyID], [PowerSupplyBrand], [PowerSupplyName], [PowerSupplyWidth], [PowerSupplyHeight], [PowerSupplyPrice], [PowerSupplyImageFileName]) VALUES (1034, N'Mooer', N'Macro Power S12', CAST(8.860 AS Decimal(5, 3)), CAST(3.480 AS Decimal(4, 3)), CAST(168.00 AS Decimal(5, 2)), N'mooer-macro-power-s12.png')
INSERT [dbo].[PowerSupplies] ([PowerSupplyID], [PowerSupplyBrand], [PowerSupplyName], [PowerSupplyWidth], [PowerSupplyHeight], [PowerSupplyPrice], [PowerSupplyImageFileName]) VALUES (1035, N'Mooer', N'Micro Power', CAST(1.500 AS Decimal(5, 3)), CAST(3.750 AS Decimal(4, 3)), CAST(98.00 AS Decimal(5, 2)), N'mooer-micro-power.png')
SET IDENTITY_INSERT [dbo].[PowerSupplies] OFF
GO
