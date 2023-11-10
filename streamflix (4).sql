-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2023. Nov 10. 18:02
-- Kiszolgáló verziója: 10.4.27-MariaDB
-- PHP verzió: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `streamflix`
--
CREATE DATABASE IF NOT EXISTS `streamflix` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci;
USE `streamflix`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalok`
--

CREATE TABLE `felhasznalok` (
  `felh_id` int(11) NOT NULL,
  `felhasznalonev` varchar(66) NOT NULL,
  `email` varchar(66) NOT NULL,
  `jelszo` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalok`
--

INSERT INTO `felhasznalok` (`felh_id`, `felhasznalonev`, `email`, `jelszo`) VALUES
(1, 'asd', 'asd', 'asd'),
(2, 'teszt', 'asd@g.com', '$2a$10$F21yEFaWasgMwngnUllHpu6Qg7jwSLwwOwt0g75qw6gaAlkvzp30.'),
(3, 'eteszt', '1@g.com', '$2a$10$XxDbYLdnX1FsgnzDz9JlJuTUlzMWRvl1PRrd6QcaKIoNYTQQJmE4G'),
(4, 'felhazsnalo', 'emai@emai.com', '$2a$10$hMILgZnqneiI4l4xUU9H0O02XWlt5z09AxwA6/LyrODboeUvfTcJC'),
(5, 'asd12', 'asd@gm.com', '$2a$10$PNqiushcni0sdi3zTGLaHuLTDOymKA5Aq/dmhW8.W4Qajk5QfchNi'),
(6, 'tesztelek', 'asd@gmail.com', '$2a$10$brLuiUgpBNtv7M5IPkc84OcrBiVwRb.4U4D/7mMGutO4G68ULB9Wu');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `filmek`
--

CREATE TABLE `filmek` (
  `film_id` int(11) NOT NULL,
  `film_neve` varchar(66) NOT NULL,
  `film_hossz` int(11) NOT NULL,
  `film_kategoria` varchar(66) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `filmek`
--

INSERT INTO `filmek` (`film_id`, `film_neve`, `film_hossz`, `film_kategoria`) VALUES
(1, 'asd', 0, 'asdjelszo'),
(2, 'asd2', 2, 'kat2');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kedvencek`
--

CREATE TABLE `kedvencek` (
  `kedvenc_id` int(11) NOT NULL,
  `felh_id` int(11) NOT NULL,
  `film_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `kedvencek`
--

INSERT INTO `kedvencek` (`kedvenc_id`, `felh_id`, `film_id`) VALUES
(1, 2, 12);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `velemenyek`
--

CREATE TABLE `velemenyek` (
  `velemeny_id` int(11) NOT NULL,
  `felh_id` int(11) DEFAULT NULL,
  `film_id` int(11) DEFAULT NULL,
  `velemenyLeirasa` text DEFAULT NULL,
  `velemenyErtekeles` int(11) DEFAULT NULL,
  `felhasznaloNeve` varchar(255) DEFAULT NULL,
  `velemenyDatuma` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `velemenyek`
--

INSERT INTO `velemenyek` (`velemeny_id`, `felh_id`, `film_id`, `velemenyLeirasa`, `velemenyErtekeles`, `felhasznaloNeve`, `velemenyDatuma`) VALUES
(1, 2, 12, 'saddas', 5, 'asd', '0000-00-00'),
(3, 2, 12, 'saddas', 5, 'asd', '0000-00-00'),
(4, 2, 12, 'saddas', 5, 'asd', '0000-00-00'),
(5, 2, 12, 'saddas', 5, 'asd', '0000-00-00'),
(6, 5, 1, 'fsafs', 5, 'asd12', '2023-11-10'),
(7, 5, 1, 'dafasfsa', 3, 'asd12', '2023-11-10'),
(8, 5, 1, 'fsafas', 5, 'asd12', '2023-11-10'),
(9, 5, 1, 'fasfg', 3, 'asd12', '2023-11-10');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD PRIMARY KEY (`felh_id`);

--
-- A tábla indexei `filmek`
--
ALTER TABLE `filmek`
  ADD PRIMARY KEY (`film_id`);

--
-- A tábla indexei `kedvencek`
--
ALTER TABLE `kedvencek`
  ADD PRIMARY KEY (`kedvenc_id`),
  ADD UNIQUE KEY `felh_id` (`felh_id`,`film_id`);

--
-- A tábla indexei `velemenyek`
--
ALTER TABLE `velemenyek`
  ADD PRIMARY KEY (`velemeny_id`),
  ADD KEY `felh_id` (`felh_id`),
  ADD KEY `film_id` (`film_id`),
  ADD KEY `felh_id_2` (`felh_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `felhasznalok`
--
ALTER TABLE `felhasznalok`
  MODIFY `felh_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `filmek`
--
ALTER TABLE `filmek`
  MODIFY `film_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `kedvencek`
--
ALTER TABLE `kedvencek`
  MODIFY `kedvenc_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `velemenyek`
--
ALTER TABLE `velemenyek`
  MODIFY `velemeny_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
