-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 18, 2024 at 04:48 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `real_los`
--

-- --------------------------------------------------------

--
-- Table structure for table `debitur`
--

CREATE TABLE `debitur` (
  `ID` int NOT NULL,
  `Faktur` varchar(20) DEFAULT NULL,
  `Rekening` varchar(15) NOT NULL DEFAULT '',
  `RekeningLama` varchar(30) DEFAULT NULL,
  `RekeningSLIK` varchar(20) DEFAULT '',
  `KodeSLIK` varchar(20) DEFAULT '',
  `Nomor` varchar(10) DEFAULT NULL,
  `Tgl` date DEFAULT '1970-01-01',
  `StatusPencairan` char(1) DEFAULT '0',
  `AutoDebet` char(1) DEFAULT 'T',
  `CaraPencairan` char(1) DEFAULT '1',
  `CaraPerhitungan` char(2) DEFAULT '0',
  `NoPengajuan` varchar(15) DEFAULT NULL,
  `RekeningJaminan` varchar(15) DEFAULT '',
  `Jaminan` varchar(20) DEFAULT '',
  `KeteranganJaminan` varchar(255) DEFAULT NULL,
  `Wilayah` varchar(4) DEFAULT NULL,
  `Kode` varchar(12) DEFAULT NULL,
  `GolonganKredit` varchar(6) DEFAULT NULL,
  `JenisPinjaman` varchar(100) DEFAULT NULL,
  `GolonganDebitur` varchar(4) DEFAULT NULL,
  `SektorEkonomi` varchar(4) DEFAULT NULL,
  `SektorEkonomiOJK` char(6) DEFAULT '',
  `SubSektorEkonomi` varchar(10) DEFAULT NULL,
  `KeteranganUsaha` varchar(200) DEFAULT '',
  `SifatKredit` varchar(4) DEFAULT NULL,
  `JenisPenggunaan` varchar(4) DEFAULT NULL,
  `KelompokDebitur` varchar(4) DEFAULT NULL,
  `GolonganPenjamin` varchar(4) DEFAULT NULL,
  `BagianYangDijamin` varchar(6) DEFAULT NULL,
  `instansi` varchar(6) DEFAULT '000',
  `NoPK` varchar(50) DEFAULT '',
  `NoSPK` varchar(50) DEFAULT NULL,
  `NoSPPK` varchar(50) DEFAULT '',
  `SukuBunga` double(10,5) DEFAULT '0.00000',
  `Plafond` double(16,0) DEFAULT '0',
  `PencairanPokok` double(16,0) DEFAULT '0',
  `TotalBunga` double(16,0) DEFAULT '0',
  `SaldoPokok` double(16,2) DEFAULT '0.00',
  `SaldoBunga` double(16,2) DEFAULT '0.00',
  `SaldoTitipan` double(16,2) DEFAULT '0.00',
  `Lama` double(10,2) DEFAULT '0.00',
  `GracePeriodPokokAwal` double(10,0) DEFAULT '0',
  `GracePeriodBungaAwal` double(10,0) DEFAULT '0',
  `GracePeriod` double(10,0) DEFAULT '1',
  `Musiman` double(10,0) DEFAULT '1',
  `AO` varchar(10) DEFAULT NULL,
  `AOTagih` char(10) DEFAULT '',
  `SumberOrder` varchar(100) DEFAULT NULL,
  `RekeningTabungan` varchar(15) DEFAULT NULL,
  `Administrasi` double(16,0) DEFAULT '0',
  `Materai` double(16,0) DEFAULT '0',
  `Notaris` double(16,0) DEFAULT '0',
  `PersenProvisi` double(10,2) DEFAULT '0.00',
  `Provisi` double(16,0) DEFAULT '0',
  `Asuransi` double(16,0) NOT NULL DEFAULT '0',
  `Angsuran1` double(16,2) DEFAULT '0.00',
  `Angsuran1Pokok` double(16,2) DEFAULT '0.00',
  `Angsuran1Bunga` double(16,2) DEFAULT '0.00',
  `JadwalPokok` double(16,2) DEFAULT '0.00',
  `JadwalBunga` double(16,2) DEFAULT '0.00',
  `PKBawahTangan` double(16,2) DEFAULT '0.00',
  `BiayaTaksasi` double(16,0) DEFAULT '0',
  `BiayaLainnya` double(16,0) DEFAULT '0',
  `Cassie` varchar(4) DEFAULT '',
  `NominalCassie` double(16,2) DEFAULT '0.00',
  `KodeNotaris` varchar(4) DEFAULT NULL,
  `KodeAsuransi` varchar(10) DEFAULT NULL,
  `JuruBayar` varchar(4) DEFAULT NULL,
  `DateTime` datetime DEFAULT '1970-01-01 00:00:00',
  `PerpanjanganKe` double DEFAULT '1',
  `BarisPencetakan` double DEFAULT '0',
  `Halaman` char(1) DEFAULT '1',
  `Nama2` varchar(40) DEFAULT '',
  `Alamat2` varchar(50) DEFAULT '',
  `Pekerjaan2` varchar(40) DEFAULT '',
  `Bentuk` varchar(40) DEFAULT NULL,
  `Nilai` double(16,2) DEFAULT '0.00',
  `Kolektibilitas` char(1) DEFAULT '0',
  `UserAcc` varchar(20) DEFAULT NULL,
  `UpdateKartu` char(1) DEFAULT '0',
  `TPokok` double(16,2) DEFAULT '0.00',
  `TBunga` double(16,2) DEFAULT '0.00',
  `UserName` varchar(20) DEFAULT '',
  `Marketing` double(16,2) DEFAULT '0.00',
  `BPKB` double(16,2) DEFAULT '0.00',
  `Lainnya` double(16,2) DEFAULT '0.00',
  `KeteranganLainnya` varchar(50) DEFAULT '',
  `JenisFasilitasSID` varchar(5) DEFAULT '0605',
  `SifatKreditSID` varchar(5) DEFAULT '79',
  `GolonganKreditSID` varchar(5) DEFAULT '20',
  `JPenggunaanSID` varchar(5) DEFAULT '39',
  `SifatBungaSID` varchar(5) DEFAULT '1',
  `KondisiSID` varchar(5) DEFAULT '',
  `GolonganDebiturSID` varchar(5) DEFAULT '907',
  `PekerjaanDebiturSID` varchar(5) DEFAULT '099',
  `TempatPerkerjaanSID` varchar(255) DEFAULT '',
  `BidangUsahaSID` varchar(5) DEFAULT '9990',
  `HubunganDebiturSID` varchar(5) DEFAULT '9900',
  `sektorekonomisid` varchar(5) DEFAULT '9990',
  `MelampauiBmpk` varchar(2) DEFAULT 'T',
  `MelanggarBmpk` varchar(2) DEFAULT 'T',
  `jenispenjaminsid` varchar(5) DEFAULT 'T',
  `Gaji` double(16,2) DEFAULT '0.00',
  `PostingKol` varchar(20) DEFAULT '',
  `CabangEntry` char(3) DEFAULT NULL,
  `StatusKolektibilitas` varchar(1) DEFAULT '0',
  `IDDebitur` varchar(255) DEFAULT '',
  `IDFasilitas` varchar(255) DEFAULT '',
  `golonganpenjaminsid` varchar(5) DEFAULT '876',
  `ProvisiPDD` double(16,2) DEFAULT '0.00',
  `TglWriteOff` char(10) DEFAULT '9999-99-99',
  `OutStanding` double(16,0) DEFAULT '0',
  `StatusOtorisasi` varchar(5) DEFAULT '0',
  `StatusOtorisasiGM` varchar(5) DEFAULT '0',
  `StatusOtorisasiPengurus` varchar(5) DEFAULT '1',
  `KeteranganOtorisasi` varchar(255) DEFAULT NULL,
  `BiayaTransaksi` double(16,2) DEFAULT '0.00',
  `FakturBiayaTransaksi` varchar(20) DEFAULT '0',
  `Keterkaitan` varchar(1) DEFAULT '',
  `PeriodePembayaran` varchar(10) DEFAULT '',
  `SumberDanaPelunasan` varchar(10) DEFAULT '',
  `IdDebiturFasilitas` varchar(255) DEFAULT '',
  `IdAgunan` varchar(255) DEFAULT '',
  `TujuanPenggunaan` varchar(255) DEFAULT '',
  `LeaderAO` varchar(4) DEFAULT '',
  `WilayahAO` varchar(4) DEFAULT '',
  `tBungaLama` double(16,2) DEFAULT '0.00',
  `StatusIPTW` char(1) DEFAULT 'T',
  `FakturWriteOff` varchar(30) DEFAULT '',
  `BakiDebetWriteOff` double(16,2) DEFAULT '0.00',
  `NoSP1` varchar(50) DEFAULT NULL,
  `TglSP1` date DEFAULT NULL,
  `TglSP1Batas` date DEFAULT NULL,
  `NoSP2` varchar(50) DEFAULT NULL,
  `TglSP2` date DEFAULT NULL,
  `TglSP2Batas` date DEFAULT NULL,
  `NoSP3` varchar(50) DEFAULT NULL,
  `TglSP3` date DEFAULT NULL,
  `TglSP3Batas` date DEFAULT NULL,
  `NoSP_Akhir` varchar(50) DEFAULT NULL,
  `TglSP_Akhir` date DEFAULT NULL,
  `TglSP_AkhirBatas` date DEFAULT NULL,
  `PinjamanKe` double(10,0) DEFAULT NULL,
  `KolCIF` char(1) DEFAULT NULL,
  `TglPermohonan` date DEFAULT '1970-01-01',
  `TglPersetujuan` date DEFAULT '1970-01-01',
  `RekeningSebelumnya` char(16) DEFAULT NULL,
  `BakiDebetSebelumnya` double(16,0) DEFAULT '0',
  `TBungaSebelumnya` double(16,0) DEFAULT '0',
  `DendaSebelumnya` double(16,2) DEFAULT '0.00',
  `SimpananPokok` double(16,2) DEFAULT '0.00',
  `SimpananWajib` double(16,2) DEFAULT '0.00',
  `OffBalance` char(1) DEFAULT '0',
  `AOMonitor` varchar(10) DEFAULT '',
  `KeteranganKomitmen` text,
  `KategoriDebitur` char(2) DEFAULT '70',
  `TglAmbilJaminan` char(30) DEFAULT '9999-99-99',
  `DateTimeAmbilJaminan` datetime DEFAULT NULL,
  `UserNameAmbilJaminan` char(30) DEFAULT NULL,
  `UserACCambilJaminan` char(30) DEFAULT NULL,
  `Keteranganambiljaminan` varchar(250) DEFAULT '',
  `TglLunas` char(10) DEFAULT '9999-99-99',
  `Status_Kol_Harian` char(1) DEFAULT '0',
  `Tgl_Kol_Harian` char(10) DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=latin1 MAX_ROWS=1000000000 ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Table structure for table `golongankredit`
--

CREATE TABLE `golongankredit` (
  `KODE` char(6) NOT NULL DEFAULT '',
  `Keterangan` varchar(40) DEFAULT NULL,
  `Rekening` varchar(20) DEFAULT NULL,
  `RekeningBunga` varchar(20) DEFAULT NULL,
  `RekeningBungaPinalty` varchar(20) DEFAULT '',
  `RekeningDenda` varchar(20) DEFAULT NULL,
  `RekeningProvisi` varchar(20) DEFAULT NULL,
  `RekeningAdministrasi` varchar(20) NOT NULL,
  `RekeningMaterai` varchar(20) DEFAULT NULL,
  `RekeningNotaris` varchar(20) DEFAULT NULL,
  `RekeningTitipan` varchar(20) DEFAULT NULL,
  `RekeningAsuransi` varchar(20) DEFAULT NULL,
  `RekeningCadanganBunga` varchar(20) DEFAULT NULL,
  `RekeningPendapatanProvisi` varchar(20) DEFAULT NULL,
  `RekeningBiayaTaksasi` varchar(20) DEFAULT NULL,
  `RekeningBiayaRC` varchar(20) DEFAULT NULL,
  `RekeningPajakBiayaRC` varchar(20) DEFAULT NULL,
  `RekeningAdministratif` varchar(20) DEFAULT NULL,
  `KodeLama` char(6) DEFAULT NULL,
  `RekeningMarketing` varchar(20) DEFAULT '',
  `RekeningBPKB` varchar(20) DEFAULT '',
  `RekeningBiayaLainnya` varchar(20) DEFAULT '',
  `RekeningLainnya` varchar(30) DEFAULT '',
  `RekeningBiayaTransaksi` varchar(20) DEFAULT '',
  `RekeningTitipanBiayaTransaksi` char(20) NOT NULL,
  `RekeningPajakBiayaTransaksi` char(20) NOT NULL,
  `RekeningPendapatanAdministrasi` varchar(20) DEFAULT '',
  `RekeningPendapatanNotaris` varchar(20) DEFAULT '',
  `RekeningPendapatanBiayaTransaksi` varchar(20) DEFAULT '',
  `RekeningIPTW` varchar(50) DEFAULT '',
  `Administrasi` double(16,2) DEFAULT '0.00',
  `TglUpdate` date DEFAULT '1970-01-01',
  `Pengakuan` char(1) DEFAULT 'T',
  `TglPengakuan` date DEFAULT '1970-01-01',
  `RekeningPendapatanLainnya` varchar(20) DEFAULT '',
  `RekeningHapusBuku` varchar(20) DEFAULT '',
  `RekeningBungaHapusBuku` varchar(50) DEFAULT '',
  `PersenIPTW` double(5,2) DEFAULT '0.00',
  `RekeningPPAP` varchar(30) DEFAULT '1.141.01',
  `RekeningPPAPNPL` varchar(30) NOT NULL,
  `RekeningPendapatanPPAP` varchar(30) NOT NULL,
  `RekeningBiayaPPAP` varchar(30) NOT NULL,
  `RekeningAdministrasiHapusBuku` varchar(20) DEFAULT NULL,
  `OffBalance` char(1) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `golongankredit`
--

INSERT INTO `golongankredit` (`KODE`, `Keterangan`, `Rekening`, `RekeningBunga`, `RekeningBungaPinalty`, `RekeningDenda`, `RekeningProvisi`, `RekeningAdministrasi`, `RekeningMaterai`, `RekeningNotaris`, `RekeningTitipan`, `RekeningAsuransi`, `RekeningCadanganBunga`, `RekeningPendapatanProvisi`, `RekeningBiayaTaksasi`, `RekeningBiayaRC`, `RekeningPajakBiayaRC`, `RekeningAdministratif`, `KodeLama`, `RekeningMarketing`, `RekeningBPKB`, `RekeningBiayaLainnya`, `RekeningLainnya`, `RekeningBiayaTransaksi`, `RekeningTitipanBiayaTransaksi`, `RekeningPajakBiayaTransaksi`, `RekeningPendapatanAdministrasi`, `RekeningPendapatanNotaris`, `RekeningPendapatanBiayaTransaksi`, `RekeningIPTW`, `Administrasi`, `TglUpdate`, `Pengakuan`, `TglPengakuan`, `RekeningPendapatanLainnya`, `RekeningHapusBuku`, `RekeningBungaHapusBuku`, `PersenIPTW`, `RekeningPPAP`, `RekeningPPAPNPL`, `RekeningPendapatanPPAP`, `RekeningBiayaPPAP`, `RekeningAdministrasiHapusBuku`, `OffBalance`) VALUES
('101', 'kredit modal kerja', NULL, NULL, '', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', '', '', '', '', '', '', '', '', '', 0.00, '1970-01-01', 'T', '1970-01-01', '', '', '', 0.00, '1.141.01', '', '', '', NULL, '0'),
('102', 'kredit konsumtif', NULL, NULL, '', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', '', '', '', '', '', '', '', '', '', 0.00, '1970-01-01', 'T', '1970-01-01', '', '', '', 0.00, '1.141.01', '', '', '', NULL, '0'),
('103', 'kredit jasa', NULL, NULL, '', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', '', '', '', '', '', '', '', '', '', 0.00, '1970-01-01', 'T', '1970-01-01', '', '', '', 0.00, '1.141.01', '', '', '', NULL, '0'),
('104', 'kredit pertanian', NULL, NULL, '', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', '', '', '', '', '', '', '', '', '', 0.00, '1970-01-01', 'T', '1970-01-01', '', '', '', 0.00, '1.141.01', '', '', '', NULL, '0');

-- --------------------------------------------------------

--
-- Table structure for table `registernasabah`
--

CREATE TABLE `registernasabah` (
  `ID` int NOT NULL,
  `CabangEntry` varchar(20) NOT NULL,
  `KodeInduk` varchar(12) DEFAULT NULL,
  `Nama` varchar(100) DEFAULT NULL,
  `Kode` varchar(12) NOT NULL DEFAULT '',
  `PasanganNasabah` varchar(255) DEFAULT '',
  `Anggota` varchar(1) DEFAULT '0',
  `Tgl` date DEFAULT '1970-01-01',
  `iddebitur` varchar(255) DEFAULT NULL,
  `KodeLama` varchar(50) DEFAULT NULL,
  `KodeUrut` double(10,0) DEFAULT NULL,
  `KodeLamaMars` char(50) DEFAULT NULL,
  `KodeSLIK` varchar(20) DEFAULT '',
  `DIN` varchar(255) DEFAULT NULL,
  `NoBerkas` varchar(20) DEFAULT NULL,
  `NamaSID` varchar(255) DEFAULT '',
  `Kelamin` char(1) DEFAULT NULL,
  `GolonganDarah` char(2) DEFAULT NULL,
  `TglLahir` date DEFAULT NULL,
  `TempatLahir` varchar(255) DEFAULT NULL,
  `StatusPerkawinan` char(1) DEFAULT NULL,
  `KTP` varchar(30) DEFAULT NULL,
  `Agama` varchar(255) DEFAULT NULL,
  `Pekerjaan` varchar(4) DEFAULT NULL,
  `PekerjaanInduk` varchar(255) DEFAULT NULL,
  `Alamat` varchar(255) DEFAULT NULL,
  `AlamatSID` varchar(255) DEFAULT '',
  `KodePos` varchar(10) DEFAULT NULL,
  `KodePosPasangan` varchar(10) DEFAULT NULL,
  `Telepon` varchar(30) DEFAULT NULL,
  `Telepon2` varchar(30) DEFAULT NULL,
  `Telepon3` varchar(30) DEFAULT NULL,
  `TeleponPasangan` varchar(30) DEFAULT NULL,
  `Fax` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Kodya` varchar(50) DEFAULT NULL,
  `KodyaKeterangan` varchar(50) DEFAULT NULL,
  `Kecamatan` varchar(255) DEFAULT NULL,
  `KecamatanKeterangan` varchar(50) DEFAULT NULL,
  `Kelurahan` varchar(255) DEFAULT NULL,
  `KelurahanKeterangan` varchar(50) DEFAULT NULL,
  `RTRW` varchar(7) DEFAULT NULL,
  `RT` char(10) DEFAULT NULL,
  `RW` char(10) DEFAULT NULL,
  `NamaKantor` varchar(50) DEFAULT NULL,
  `AlamatKantor` varchar(50) DEFAULT NULL,
  `TeleponKantor` varchar(30) DEFAULT NULL,
  `FaxKantor` varchar(30) DEFAULT NULL,
  `KodeposKantor` varchar(10) DEFAULT NULL,
  `KodyaKantor` varchar(255) DEFAULT NULL,
  `KecamatanKantor` varchar(255) DEFAULT NULL,
  `KelurahanKantor` varchar(255) DEFAULT NULL,
  `RTRWKantor` varchar(255) DEFAULT NULL,
  `AO` varchar(4) DEFAULT NULL,
  `NamaLembaga` varchar(40) DEFAULT NULL,
  `AlamatLembaga` varchar(50) DEFAULT NULL,
  `NoAktePendirian` varchar(25) DEFAULT NULL,
  `NoNPWP` varchar(25) DEFAULT NULL,
  `KodyaLembaga` varchar(255) DEFAULT NULL,
  `KecamatanLembaga` varchar(255) DEFAULT NULL,
  `KelurahanLembaga` varchar(255) DEFAULT NULL,
  `AlamatTinggal` varchar(50) DEFAULT NULL,
  `KodePosTinggal` varchar(10) DEFAULT NULL,
  `TeleponTinggal` varchar(30) DEFAULT NULL,
  `FaxTinggal` varchar(30) DEFAULT NULL,
  `KodyaTinggal` varchar(255) DEFAULT NULL,
  `KecamatanTinggal` varchar(255) DEFAULT NULL,
  `KelurahanTinggal` varchar(255) DEFAULT NULL,
  `RTRWTinggal` varchar(255) DEFAULT NULL,
  `TglMulaiKTP` date DEFAULT '1970-01-01',
  `TglKTP` date DEFAULT NULL,
  `NPWP` varchar(25) DEFAULT NULL,
  `Bagian` varchar(255) DEFAULT NULL,
  `Peta` varchar(255) DEFAULT NULL,
  `PosPeta` varchar(255) DEFAULT NULL,
  `PetaTinggal` varchar(255) DEFAULT NULL,
  `PosPetaTinggal` varchar(255) DEFAULT NULL,
  `IbuKandung` varchar(30) DEFAULT '',
  `IbuKandungSID` varchar(255) DEFAULT '',
  `NamaPasangan` varchar(40) DEFAULT NULL,
  `StatusKewargaNegaraan` char(1) DEFAULT 'I',
  `NamaNegara` varchar(10) DEFAULT '',
  `StatusKependudukan` char(1) DEFAULT 'P',
  `PenghasilanKotor` char(1) DEFAULT '1',
  `SumberDana` char(1) DEFAULT '',
  `NamaSumberDanaLainnya` varchar(20) DEFAULT '',
  `TujuanPenggunaanDana` char(1) DEFAULT '',
  `NamaTujuanPenggunaanDanaLainnya` varchar(20) DEFAULT '',
  `TempatLahirPasangan` varchar(255) DEFAULT '',
  `TglLahirPasangan` date DEFAULT '1900-01-01',
  `KTPPasangan` varchar(50) DEFAULT '',
  `TglKTPPasangan` date DEFAULT '1900-01-01',
  `KodyaPasangan` varchar(255) DEFAULT '',
  `KecamatanPasangan` varchar(255) DEFAULT '',
  `KelurahanPasangan` varchar(255) DEFAULT '',
  `RTRWPasangan` varchar(7) DEFAULT '',
  `NamaAlias` varchar(255) DEFAULT '',
  `StatusGelar` varchar(10) DEFAULT '',
  `NamaKeluarga` varchar(40) DEFAULT '',
  `AlamatKeluarga` varchar(50) DEFAULT '',
  `TeleponKeluarga` varchar(30) DEFAULT '',
  `KodyaKeluarga` varchar(255) DEFAULT '',
  `KecamatanKeluarga` varchar(255) DEFAULT '',
  `KelurahanKeluarga` varchar(255) DEFAULT '',
  `RTRWKeluarga` varchar(255) DEFAULT '',
  `Gelar` varchar(20) DEFAULT '',
  `statuskirim` varchar(2) DEFAULT '0',
  `Instansi` varchar(8) DEFAULT '',
  `NIP` varchar(25) DEFAULT '',
  `KotaLama` varchar(255) DEFAULT '',
  `DesaTinggal` varchar(100) DEFAULT NULL,
  `AlamatPasangan` varchar(50) DEFAULT '',
  `PekerjaanPasangan` varchar(255) DEFAULT NULL,
  `golongandebitursid` varchar(4) DEFAULT NULL,
  `TglUpdate` date DEFAULT '1970-01-01',
  `Jenis` varchar(1) DEFAULT 'P',
  `JenisIdentitas` varchar(5) DEFAULT '',
  `Keterkaitan` varchar(4) DEFAULT NULL,
  `UpdateDIN` char(1) DEFAULT '1',
  `Kelas` varchar(50) DEFAULT '',
  `Jurusan` varchar(50) DEFAULT '1',
  `StatusData` char(1) NOT NULL DEFAULT '1',
  `KTPSeumurHidup` char(1) DEFAULT '0',
  `ResikoDana` char(1) DEFAULT 'R',
  `IDNasabah` char(1) DEFAULT 'R',
  `TglKeluar` date DEFAULT '1970-01-01',
  `UserName` varchar(100) DEFAULT NULL,
  `Status` varchar(20) DEFAULT NULL,
  `SPokok` double(16,0) DEFAULT NULL,
  `SWajib` double(16,0) DEFAULT NULL,
  `SKhusus` double(16,0) DEFAULT NULL,
  `StatusAktif` char(1) DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `registernasabah`
--

INSERT INTO `registernasabah` (`ID`, `CabangEntry`, `KodeInduk`, `Nama`, `Kode`, `PasanganNasabah`, `Anggota`, `Tgl`, `iddebitur`, `KodeLama`, `KodeUrut`, `KodeLamaMars`, `KodeSLIK`, `DIN`, `NoBerkas`, `NamaSID`, `Kelamin`, `GolonganDarah`, `TglLahir`, `TempatLahir`, `StatusPerkawinan`, `KTP`, `Agama`, `Pekerjaan`, `PekerjaanInduk`, `Alamat`, `AlamatSID`, `KodePos`, `KodePosPasangan`, `Telepon`, `Telepon2`, `Telepon3`, `TeleponPasangan`, `Fax`, `Email`, `Kodya`, `KodyaKeterangan`, `Kecamatan`, `KecamatanKeterangan`, `Kelurahan`, `KelurahanKeterangan`, `RTRW`, `RT`, `RW`, `NamaKantor`, `AlamatKantor`, `TeleponKantor`, `FaxKantor`, `KodeposKantor`, `KodyaKantor`, `KecamatanKantor`, `KelurahanKantor`, `RTRWKantor`, `AO`, `NamaLembaga`, `AlamatLembaga`, `NoAktePendirian`, `NoNPWP`, `KodyaLembaga`, `KecamatanLembaga`, `KelurahanLembaga`, `AlamatTinggal`, `KodePosTinggal`, `TeleponTinggal`, `FaxTinggal`, `KodyaTinggal`, `KecamatanTinggal`, `KelurahanTinggal`, `RTRWTinggal`, `TglMulaiKTP`, `TglKTP`, `NPWP`, `Bagian`, `Peta`, `PosPeta`, `PetaTinggal`, `PosPetaTinggal`, `IbuKandung`, `IbuKandungSID`, `NamaPasangan`, `StatusKewargaNegaraan`, `NamaNegara`, `StatusKependudukan`, `PenghasilanKotor`, `SumberDana`, `NamaSumberDanaLainnya`, `TujuanPenggunaanDana`, `NamaTujuanPenggunaanDanaLainnya`, `TempatLahirPasangan`, `TglLahirPasangan`, `KTPPasangan`, `TglKTPPasangan`, `KodyaPasangan`, `KecamatanPasangan`, `KelurahanPasangan`, `RTRWPasangan`, `NamaAlias`, `StatusGelar`, `NamaKeluarga`, `AlamatKeluarga`, `TeleponKeluarga`, `KodyaKeluarga`, `KecamatanKeluarga`, `KelurahanKeluarga`, `RTRWKeluarga`, `Gelar`, `statuskirim`, `Instansi`, `NIP`, `KotaLama`, `DesaTinggal`, `AlamatPasangan`, `PekerjaanPasangan`, `golongandebitursid`, `TglUpdate`, `Jenis`, `JenisIdentitas`, `Keterkaitan`, `UpdateDIN`, `Kelas`, `Jurusan`, `StatusData`, `KTPSeumurHidup`, `ResikoDana`, `IDNasabah`, `TglKeluar`, `UserName`, `Status`, `SPokok`, `SWajib`, `SKhusus`, `StatusAktif`) VALUES
(1, '101', NULL, ' YULI KUSTINA', '101010228', NULL, '2', '1970-01-01', NULL, '1022874', 2874, NULL, '', NULL, NULL, '', 'P', NULL, '1985-07-20', 'BANDAR LAMPUNG\n', 'N', '1871036007850006\n', 'ISLAM', 'KARY', NULL, 'KP KALILANGSE NO 6 RT 08 RW 04 SEMARANG\n', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'GAJAHMUNGKUR\n', NULL, 'GAJAHMUNGKUR\n', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1970-01-01', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', NULL, 'I', '', 'P', '1', '', '', '', '', '', '1900-01-01', '', '1900-01-01', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '0', '', '', '', NULL, '', NULL, NULL, '1970-01-01', 'P', '', NULL, '1', '', '1', '1', '0', 'R', 'R', '1970-01-01', NULL, 'PASIF', 0, 0, 0, '1'),
(2, '101', NULL, 'CONTOH', '116372838', NULL, '2', '1970-01-01', NULL, '1022874', 2874, NULL, '', NULL, NULL, '', 'P', NULL, '1985-07-20', 'BANDUNG', 'N', '1871036007850006\r\n', 'ISLAM', 'KARY', NULL, 'DISANA', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'GAJAHMUNGKUR\r\n', NULL, 'GAJAHMUNGKUR\r\n', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1970-01-01', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', NULL, 'I', '', 'P', '1', '', '', '', '', '', '1900-01-01', '', '1900-01-01', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '0', '', '', '', NULL, '', NULL, NULL, '1970-01-01', 'P', '', NULL, '1', '', '1', '1', '0', 'R', 'R', '1970-01-01', NULL, NULL, NULL, NULL, NULL, '1'),
(3, '101', NULL, 'JOHN', '116372838', NULL, '2', '1970-01-01', NULL, '1022874', 2874, NULL, '', NULL, NULL, '', 'P', NULL, '1985-07-20', 'BANDUNG', 'N', '1871036007850006\r\n', 'ISLAM', 'KARY', NULL, 'DISANA', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'GAJAHMUNGKUR\r\n', NULL, 'GAJAHMUNGKUR\r\n', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1970-01-01', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', NULL, 'I', '', 'P', '1', '', '', '', '', '', '1900-01-01', '', '1900-01-01', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '0', '', '', '', NULL, '', NULL, NULL, '1970-01-01', 'P', '', NULL, '1', '', '1', '1', '0', 'R', 'R', '1970-01-01', NULL, NULL, NULL, NULL, NULL, '1');

-- --------------------------------------------------------

--
-- Table structure for table `username`
--

CREATE TABLE `username` (
  `ID` bigint NOT NULL,
  `UserName` varchar(20) DEFAULT NULL,
  `Plafond` double(16,2) DEFAULT '999999999.00',
  `PlafondKredit` double(16,2) DEFAULT '0.00',
  `UserPassword` varchar(255) DEFAULT NULL,
  `FullName` varchar(50) DEFAULT NULL,
  `Cabang` varchar(4) DEFAULT '101',
  `ManagerArea` varchar(200) DEFAULT '',
  `Login` char(1) DEFAULT '0',
  `Jabatan` char(1) DEFAULT '0',
  `KasTeller` varchar(20) DEFAULT NULL,
  `KODE` char(10) DEFAULT '',
  `Online` double(16,0) DEFAULT '0',
  `TimeOut` double(16,2) DEFAULT '0.00',
  `Kas` char(1) DEFAULT '0',
  `Tabungan` char(1) DEFAULT '0',
  `Deposito` char(1) DEFAULT '0',
  `Kredit` char(1) DEFAULT '0',
  `Akuntansi` char(1) DEFAULT '0',
  `Block` char(1) DEFAULT '0',
  `Aktif` char(1) DEFAULT '0',
  `CabangInduk` char(4) DEFAULT '101',
  `Tgl` date DEFAULT '1970-01-01',
  `PortPrinter` varchar(20) DEFAULT '',
  `PlafondSetoran` double(16,2) DEFAULT '0.00',
  `Gabungan` char(1) DEFAULT '0',
  `UserNameAcc` varchar(20) DEFAULT '',
  `Unit` char(1) DEFAULT '1',
  `StatusOtorisasi` char(1) DEFAULT '0',
  `IP` varchar(20) NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `debitur`
--
ALTER TABLE `debitur`
  ADD PRIMARY KEY (`Rekening`,`ID`) USING BTREE,
  ADD KEY `TglID` (`Tgl`,`ID`),
  ADD KEY `StatusPencairan` (`StatusPencairan`,`Rekening`),
  ADD KEY `RekeningTabungan` (`RekeningTabungan`,`CaraPerhitungan`),
  ADD KEY `CaraPerhitunganRekening` (`CaraPerhitungan`,`Rekening`),
  ADD KEY `RekeningLama` (`RekeningLama`),
  ADD KEY `Casie` (`Cassie`,`Rekening`),
  ADD KEY `PostingKol` (`PostingKol`,`Rekening`),
  ADD KEY `KodeOnly` (`Kode`),
  ADD KEY `CabangEntry` (`CabangEntry`),
  ADD KEY `RekeningOnly` (`Rekening`),
  ADD KEY `Wilayah` (`Wilayah`),
  ADD KEY `AO` (`AO`),
  ADD KEY `KodeAsuransi` (`KodeAsuransi`),
  ADD KEY `GolonganKredit` (`GolonganKredit`),
  ADD KEY `GolonganDebitur` (`GolonganDebitur`),
  ADD KEY `NoPengajuan` (`NoPengajuan`),
  ADD KEY `instansi` (`instansi`),
  ADD KEY `SektorEkonomi` (`SektorEkonomi`),
  ADD KEY `SektorEkonomiOJK` (`SektorEkonomiOJK`),
  ADD KEY `JenisPenggunaan` (`JenisPenggunaan`);

--
-- Indexes for table `golongankredit`
--
ALTER TABLE `golongankredit`
  ADD PRIMARY KEY (`KODE`);

--
-- Indexes for table `registernasabah`
--
ALTER TABLE `registernasabah`
  ADD PRIMARY KEY (`Kode`,`ID`) USING BTREE,
  ADD KEY `REGISTERNASABAH_NAMA` (`Nama`,`Kode`),
  ADD KEY `Tgl` (`Tgl`,`Kode`),
  ADD KEY `KodeLama` (`KodeLama`,`Kode`),
  ADD KEY `KodeLamaOnly` (`KodeLama`),
  ADD KEY `NamaOnly` (`Nama`),
  ADD KEY `KodeIndukKode` (`KodeInduk`,`Kode`),
  ADD KEY `KodeKodeInduk` (`Kode`,`KodeInduk`);

--
-- Indexes for table `username`
--
ALTER TABLE `username`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `UserName` (`UserName`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `debitur`
--
ALTER TABLE `debitur`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `registernasabah`
--
ALTER TABLE `registernasabah`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `username`
--
ALTER TABLE `username`
  MODIFY `ID` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
