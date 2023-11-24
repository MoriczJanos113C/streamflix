-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2023. Nov 24. 19:08
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

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalok`
--

CREATE TABLE `felhasznalok` (
  `felh_id` int(11) NOT NULL,
  `felhasznalonev` varchar(66) NOT NULL,
  `email` varchar(66) NOT NULL,
  `jelszo` varchar(500) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalok`
--

INSERT INTO `felhasznalok` (`felh_id`, `felhasznalonev`, `email`, `jelszo`, `role`) VALUES
(10, 'Admin', 'admin@gmail.com', '$2a$10$C9kwBpDS0dqKdF.CqkpK8O0io2yB21l/M9JX3m5PWLs5Tm6EymMtS', 'admin'),
(11, 'GazoLajos', 'gazolajos@gmail.com', '$2a$10$7RMwX33zaRXKEuGkiQTEVuu2.3/Fp7KAi.dv3UcvkNWg6cfvmbodC', 'felhasználó'),
(12, 'Mester', 'mester@gmail.com', '$2a$10$AtoSh46ozcz4R8aH9b/vVeBGOAmYQJo142Tm2WcyPF3unu0beKEGm', 'felhasználó'),
(13, 'Pista', 'pista@gmail.com', '$2a$10$2g3XjhDMl3sWwp5.GUCv0uw9V1YHXFa.tXx0hKPCFNMGHD96lSOo2', 'felhasználó'),
(14, 'BOSS69', 'boss@gmail.com', '$2a$10$eLpAVYGIKUwdxclULxxjRetbBuXznAcz04IkxMYWFcJal9YIBL4qO', 'felhasználó'),
(15, 'BartosIstvan47', 'bartosistvan@gmail.com', '$2a$10$y30Onej2rNKOJGm6buQ...7TeDbKnEaY83KhHK739yGwJQ65yT0ca', 'felhasználó'),
(16, 'Rozikaneni', 'rozi@gmail.com', '$2a$10$M4hZ2O8zxOh9kFUSt8bA..Z7n.gMBFPmCbsXhiHd4TlHrx/5Lg17K', 'felhasználó'),
(17, '123LOL', 'lol@gmail.com', '$2a$10$hLcFNnTLFO25ZEwJi/jNeuDtStMGSjyZP1L/bxkFH8.XzMN/brA0O', 'felhasználó'),
(18, 'mIKULAS', 'mikulas@gmail.com', '$2a$10$/oID9870e4OkXu5rrIP8kuxTCg7giDk4uQxNgcDpnphJA3Wj5Se16', 'felhasználó'),
(19, 'ILOVEHORROR', 'horror@gmail.com', '$2a$10$cDwNbYxykVGsoO8n74I9nOYDeopMaI7KB7l7oAJrTqYWEYoB2wnbq', 'felhasználó');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `filmek`
--

CREATE TABLE `filmek` (
  `film_id` int(11) NOT NULL,
  `film_neve` varchar(66) NOT NULL,
  `film_hossz` int(11) NOT NULL,
  `film_kategoria` varchar(66) NOT NULL,
  `film_kep` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `filmek`
--

INSERT INTO `filmek` (`film_id`, `film_neve`, `film_hossz`, `film_kategoria`, `film_kep`) VALUES
(6, 'Annabelle', 99, 'horror', 'IeNSGcs4suneD2sbME5ro.jpeg'),
(7, 'Az apáca', 96, 'horror', 'ITUD2_hEEbzVXpeTthU6y.jpeg'),
(8, 'Az', 135, 'horror', 'e8n9kGKxQ-aEjkCGykxyr.jpeg'),
(9, 'Démonok között', 112, 'horror', 'EOUa1ZiHwOpI6QlZTsqGJ.jpeg'),
(10, 'Péntek 13', 97, 'horror', 'm-4Ks18f7sB8l0blREyNw.jpeg'),
(11, 'Casablanca', 102, 'romantikus', 'vtecCB1sXTk-jTufcvTkr.jpeg'),
(12, 'Idétlen időkig', 101, 'romantikus', 'SJINUE1kzlB0GvjLgRIQp.jpeg'),
(13, 'Időről időre', 123, 'romantikus', '0vzATMLCRKMSs7lzG2aRe.jpeg'),
(14, 'Lesz még így se', 139, 'romantikus', 'k8bI0QlR30UBgyEC2CX2h.jpeg'),
(15, 'Meseautó', 99, 'romantikus', '9SJEJf7Mm372JtTdqKhCt.jpeg'),
(16, 'Truman Show', 103, 'vígjáték', '0rL3EY-SoIAAc_qr96hBT.jpeg'),
(17, 'Életrevalók', 112, 'vígjáték', 'rDWChBciZstjW3Te9Kylz.jpeg'),
(18, 'Különben dühbe jövünk', 101, 'vígjáték', 'hPUkqJnfvAknbn-5D5irT.jpeg'),
(19, 'Másnaposok', 100, 'vígjáték', 'gqaU67rXO06MHdIQJO88z.jpeg'),
(20, 'Vissza a jövőbe', 116, 'vígjáték', 'vK45gpyDzmFHpPwBFfxoV.jpeg'),
(21, 'A gyűrűk ura', 178, 'fantasy', 'ktY1LHIVDtWO7yGM70aCi.jpeg'),
(22, 'A Karib-tenger kalózai', 143, 'fantasy', 'eJuCUYe7ZoSSR3I_0Rfrn.jpeg'),
(23, 'Halott ember', 121, 'fantasy', 'vR6KaPsLilpl1Df4rO1R_.jpeg'),
(24, 'Csillagok háborúja', 121, 'fantasy', 'wEJ8VwIwU8xR_0evMlu6z.jpeg'),
(25, 'Harry Potter', 130, 'fantasy', 'Tv14gOjtY6pnhPMUJ4uGM.jpeg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kedvencek`
--

CREATE TABLE `kedvencek` (
  `kedvenc_id` int(11) NOT NULL,
  `felh_id` int(11) NOT NULL,
  `film_id` int(11) NOT NULL,
  `film_neve` varchar(255) NOT NULL,
  `film_kep` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `kedvencek`
--

INSERT INTO `kedvencek` (`kedvenc_id`, `felh_id`, `film_id`, `film_neve`, `film_kep`) VALUES
(5, 11, 19, 'Másnaposok', 'gqaU67rXO06MHdIQJO88z.jpeg'),
(7, 11, 24, 'Csillagok háborúja', 'wEJ8VwIwU8xR_0evMlu6z.jpeg'),
(9, 12, 21, 'A gyűrűk ura', 'ktY1LHIVDtWO7yGM70aCi.jpeg'),
(10, 12, 15, 'Meseautó', '9SJEJf7Mm372JtTdqKhCt.jpeg'),
(17, 15, 19, 'Másnaposok', 'gqaU67rXO06MHdIQJO88z.jpeg'),
(20, 18, 15, 'Meseautó', '9SJEJf7Mm372JtTdqKhCt.jpeg'),
(24, 19, 9, 'Démonok között', 'EOUa1ZiHwOpI6QlZTsqGJ.jpeg'),
(25, 19, 10, 'Péntek 13', 'm-4Ks18f7sB8l0blREyNw.jpeg'),
(29, 11, 17, 'Életrevalók', 'rDWChBciZstjW3Te9Kylz.jpeg'),
(30, 11, 18, 'Különben dühbe jövünk', 'hPUkqJnfvAknbn-5D5irT.jpeg'),
(32, 12, 9, 'Démonok között', 'EOUa1ZiHwOpI6QlZTsqGJ.jpeg'),
(33, 13, 16, 'Truman Show', '0rL3EY-SoIAAc_qr96hBT.jpeg'),
(34, 14, 23, 'Halott ember', 'vR6KaPsLilpl1Df4rO1R_.jpeg'),
(35, 14, 22, 'A Karib-tenger kalózai', 'eJuCUYe7ZoSSR3I_0Rfrn.jpeg'),
(36, 14, 18, 'Különben dühbe jövünk', 'hPUkqJnfvAknbn-5D5irT.jpeg'),
(38, 14, 6, 'Annabelle', 'IeNSGcs4suneD2sbME5ro.jpeg'),
(39, 14, 11, 'Casablanca', 'vtecCB1sXTk-jTufcvTkr.jpeg'),
(42, 17, 20, 'Vissza a jövőbe', 'vK45gpyDzmFHpPwBFfxoV.jpeg'),
(43, 17, 21, 'A gyűrűk ura', 'ktY1LHIVDtWO7yGM70aCi.jpeg'),
(44, 18, 17, 'Életrevalók', 'rDWChBciZstjW3Te9Kylz.jpeg'),
(45, 19, 6, 'Annabelle', 'IeNSGcs4suneD2sbME5ro.jpeg'),
(46, 19, 7, 'Az apáca', 'ITUD2_hEEbzVXpeTthU6y.jpeg'),
(47, 19, 8, 'Az', 'e8n9kGKxQ-aEjkCGykxyr.jpeg');

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
(11, 11, 16, 'vélemény', 4, 'GazoLajos', '2023-11-25'),
(12, 11, 19, 'Vicces volt', 5, 'GazoLajos', '2023-11-25'),
(13, 11, 24, 'Régi klasszikus', 5, 'GazoLajos', '2023-11-25'),
(14, 12, 25, 'Nem tetszett', 1, 'Mester', '2023-11-25'),
(15, 13, 7, 'Jó volt', 3, 'Pista', '2023-11-25'),
(16, 13, 18, 'XDDDDDDD', 5, 'Pista', '2023-11-25'),
(17, 14, 9, 'Nagyon féltem', 2, 'BOSS69', '2023-11-25'),
(18, 14, 13, 'Undoritó', 1, 'BOSS69', '2023-11-25'),
(19, 14, 20, 'Lejobb film', 5, 'BOSS69', '2023-11-25'),
(20, 16, 6, 'Ide mit kell írni?', 2, 'Rozikaneni', '2023-11-25'),
(21, 16, 18, 'Hogy kell kivenni a kedvencekből?????', 1, 'Rozikaneni', '2023-11-25'),
(22, 16, 12, 'Köszönöm a 4 rózsát', 5, 'Rozikaneni', '2023-11-25'),
(23, 18, 10, 'A péntek 13-filmek legrosszabb és egyben nézhetetlen darabja, amit annyira felesleges volt megcsinálni, hogy az biztos, hogy emiatt a film miatt van az egész jogi hercehurca a széria körül. Ez egy nagy szar film,a többi része ezerszer jobb,', 1, 'mIKULAS', '2023-11-25'),
(24, 18, 15, 'Az egyik kedvenc magyar filmem. Nagyon jó a humora, rendkívül szórakoztató. Hangulatos, fülbemászó a zenéje. Érzelmileg is megfogó a film. Érdemes megnézni.', 4, 'mIKULAS', '2023-11-25'),
(25, 18, 16, 'fagabbwaq', 3, 'mIKULAS', '2023-11-25'),
(26, 18, 24, 'Ez se rossz, de az 5 q legjobb!!', 3, 'mIKULAS', '2023-11-25'),
(27, 19, 12, '[dislike]', 1, 'ILOVEHORROR', '2023-11-25'),
(28, 19, 17, 'A 2 jobb csak még nem jelent meg', 2, 'ILOVEHORROR', '2023-11-25'),
(31, 17, 12, 'Nézhető', 4, '123LOL', '2023-11-25');

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
  MODIFY `felh_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT a táblához `filmek`
--
ALTER TABLE `filmek`
  MODIFY `film_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT a táblához `kedvencek`
--
ALTER TABLE `kedvencek`
  MODIFY `kedvenc_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT a táblához `velemenyek`
--
ALTER TABLE `velemenyek`
  MODIFY `velemeny_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
