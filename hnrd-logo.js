/* HNRD WORLDWIDE — logo z línií (animácia). NETREBA upravovať.
   Používa: hnrd-skin.js (logo v navigácii) a landing page.
   HNRDLogo.mount(prvok, { mini:true })  → malé logo vyplní prvok
   HNRDLogo.mount(prvok, { enterText:"...", shopUrl:"..." }) → celé intro */
(function(){
  if (window.HNRDLogo) return;
  var css = document.createElement('style');
  css.textContent =
    '.hnrd-logo{position:relative;display:block;color:inherit}' +
    '.hnrd-logo svg{position:absolute;inset:0;width:100%;height:100%;display:block;overflow:visible;pointer-events:none}' +
    '.hnrd-logo .fill{fill:currentColor}' +
    '.hnrd-logo .band{fill:none;stroke:currentColor;stroke-linecap:butt;stroke-linejoin:round}' +
    '.hnrd-logo .hit{fill:transparent;cursor:pointer;pointer-events:all}' +
    /* text pod logom (ENTER THE SHOP) */
    '.hnrd-logo .enter{position:absolute;left:0;right:0;text-align:center;font:700 clamp(11px,1.3vw,14px)/1 "JetBrains Mono",ui-monospace,monospace;letter-spacing:.38em;text-transform:uppercase;color:inherit;pointer-events:none}' +
    '.hnrd-logo .enter span{display:inline-block;position:relative;padding:14px 6px 14px calc(6px + .38em);cursor:pointer;pointer-events:auto;outline:none}' +
    '.hnrd-logo .enter i{display:inline-block;font-style:normal;opacity:0;transform:translateY(.9em);filter:blur(3px);transition:opacity .5s cubic-bezier(.2,.8,.2,1),transform .6s cubic-bezier(.2,.8,.2,1),filter .5s}' +
    '.hnrd-logo .enter.in i{opacity:1;transform:none;filter:none}' +
    '.hnrd-logo .enter.on span{animation:hnrdLpulse 2.2s ease-in-out infinite}' +
    '.hnrd-logo .enter span::after{content:"";position:absolute;left:calc(6px + .38em);right:6px;bottom:6px;height:2px;background:currentColor;transform:scaleX(0);transform-origin:left;transition:transform .45s cubic-bezier(.7,0,.2,1)}' +
    '.hnrd-logo .enter.in span:hover::after,.hnrd-logo .enter.in span:focus-visible::after{transform:scaleX(1)}' +
    '.hnrd-logo .enter.in span:hover{animation:none}' +
    '.hnrd-logo .enter.off i{opacity:0;transform:translateY(-.6em);filter:blur(3px);transition-duration:.3s;transition-delay:0s!important}' +
    '@keyframes hnrdLpulse{0%,100%{opacity:1}50%{opacity:.35}}' +
    /* nočný režim: fosforová žiara */
    '.hnrd-night .hnrd-logo svg{filter:drop-shadow(0 0 3px rgb(190 255 150 / .9)) drop-shadow(0 0 16px rgb(120 255 90 / .45))}' +
    '.hnrd-night .hnrd-logo .enter{text-shadow:0 0 6px rgb(170 255 130 / .8),0 0 18px rgb(120 255 90 / .4)}' +
    '.hnrd-charge .hnrd-logo svg{animation:hnrdLcharge 1.3s ease-out}' +
    '@keyframes hnrdLcharge{0%{opacity:.15}12%{opacity:1}22%{opacity:.55}38%{opacity:1}100%{opacity:1}}';
  document.head.appendChild(css);
  const HNRD_DATA = {"w":1967,"h":922,"s":[{"d":"M669.55 32.3 L698.19 95 Q534.71 102.4 371.2 117.76 L371.2 104.25 C387.62 98.59 403.72 92.78 419.96 87.42 A1578.82 1578.82 0 0 1 632.93 34.33 C643.1 32.49 653.35 30.97 663.49 29.08 A4.7 4.7 0 0 1 669.55 32.3 Z M1406.54 100.07 Q1128.46 83.46 850.42 89.83 L850.42 8.7 C854.52 8.33 858.11 7.85 861.74 7.74 C894.22 6.63 926.73 5.44 959.21 4.55 C974.01 4.15 989.1 3.7 1004.01 4.26 C1048.41 5.89 1092.8 6.96 1137.19 10.25 C1180.32 13.43 1223.35 18.5 1266.34 23.75 C1291.97 26.86 1317.39 31.82 1342.88 36.04 A13.28 13.28 0 0 1 1347.98 38.48 A220.26 220.26 0 0 1 1406.54 100.07 Z M1627.39 116.83 Q1524.74 107.36 1422.04 101 L1422.04 52.42 C1432.51 55.01 1442.39 57.34 1452.19 59.82 A1337.58 1337.58 0 0 1 1627.39 116.83 Z","p":[["M669.55 32.3 L698.19 95 Q534.71 102.4 371.2 117.76 L371.2 104.25 C387.62 98.59 403.72 92.78 419.96 87.42 A1578.82 1578.82 0 0 1 632.93 34.33 C643.1 32.49 653.35 30.97 663.49 29.08 A4.7 4.7 0 0 1 669.55 32.3 Z",534.7],["M1406.54 100.07 Q1128.46 83.46 850.42 89.83 L850.42 8.7 C854.52 8.33 858.11 7.85 861.74 7.74 C894.22 6.63 926.73 5.44 959.21 4.55 C974.01 4.15 989.1 3.7 1004.01 4.26 C1048.41 5.89 1092.8 6.96 1137.19 10.25 C1180.32 13.43 1223.35 18.5 1266.34 23.75 C1291.97 26.86 1317.39 31.82 1342.88 36.04 A13.28 13.28 0 0 1 1347.98 38.48 A220.26 220.26 0 0 1 1406.54 100.07 Z",1128.5],["M1627.39 116.83 Q1524.74 107.36 1422.04 101 L1422.04 52.42 C1432.51 55.01 1442.39 57.34 1452.19 59.82 A1337.58 1337.58 0 0 1 1627.39 116.83 Z",1524.7]],"x0":371,"x1":1626,"xs0":371,"xs1":1590,"th":75.0,"q":[0.000185861,-0.366073,225.774]},{"d":"M207.76 182.35 C209.06 181.5 210.5 180.79 212.42 179.76 L212.42 261.14 Q152.05 266.25 91.71 272.24 A486.87 486.87 0 0 1 155.34 217.34 C172.4 205.02 190.26 193.96 207.76 182.35 Z M718.75 139.69 Q739.51 185.12 760.34 230.62 Q565.86 235.69 371.35 248.9 L371.35 161.04 Q545.03 146.28 718.75 139.69 Z M1871.14 267.65 Q1780.55 259.22 1689.88 252.6 C1676.52 251.6 1663.17 250.67 1649.77 249.75 L1649.77 249.75 L1642.38 249.23 C1632.39 248.53 1622.36 247.86 1612.37 247.23 L1607.08 246.9 Q1585.78 245.53 1564.47 244.24 L1531.17 242.28 L1528.99 242.28 C1515.56 241.5 1502.13 240.8 1488.67 240.09 S1461.77 238.72 1448.31 238.1 L1441.39 237.76 L1404.4 236.14 C1391.04 235.54 1377.72 234.99 1364.37 234.51 C1354.75 234.1 1345.09 233.77 1335.48 233.43 L1329.96 233.43 C1324.53 233.21 1319.09 233.03 1313.61 232.88 Q1301.63 232.44 1289.57 232.1 C1275.21 231.66 1260.82 231.25 1246.47 230.88 L1233 230.55 Q1215.65 230.11 1198.27 229.77 L1195.34 229.77 L1173.15 229.37 Q1113.4 228.22 1053.55 227.96 L1035.46 227.96 Q1003.38 227.96 971.27 227.96 L959.25 227.96 Q904.83 228.18 850.34 229.11 L850.34 135.81 A7493.73 7493.73 0 0 1 1739.23 170.4 L1739.23 170.4 A668.07 668.07 0 0 1 1835.74 235.88 C1848.13 246.01 1859.97 256.56 1871.14 267.65 Z","p":[["M207.76 182.35 C209.06 181.5 210.5 180.79 212.42 179.76 L212.42 261.14 Q152.05 266.25 91.71 272.24 A486.87 486.87 0 0 1 155.34 217.34 C172.4 205.02 190.26 193.96 207.76 182.35 Z",152.1],["M718.75 139.69 Q739.51 185.12 760.34 230.62 Q565.86 235.69 371.35 248.9 L371.35 161.04 Q545.03 146.28 718.75 139.69 Z",565.8],["M1871.14 267.65 Q1780.55 259.22 1689.88 252.6 C1676.52 251.6 1663.17 250.67 1649.77 249.75 L1649.77 249.75 L1642.38 249.23 C1632.39 248.53 1622.36 247.86 1612.37 247.23 L1607.08 246.9 Q1585.78 245.53 1564.47 244.24 L1531.17 242.28 L1528.99 242.28 C1515.56 241.5 1502.13 240.8 1488.67 240.09 S1461.77 238.72 1448.31 238.1 L1441.39 237.76 L1404.4 236.14 C1391.04 235.54 1377.72 234.99 1364.37 234.51 C1354.75 234.1 1345.09 233.77 1335.48 233.43 L1329.96 233.43 C1324.53 233.21 1319.09 233.03 1313.61 232.88 Q1301.63 232.44 1289.57 232.1 C1275.21 231.66 1260.82 231.25 1246.47 230.88 L1233 230.55 Q1215.65 230.11 1198.27 229.77 L1195.34 229.77 L1173.15 229.37 Q1113.4 228.22 1053.55 227.96 L1035.46 227.96 Q1003.38 227.96 971.27 227.96 L959.25 227.96 Q904.83 228.18 850.34 229.11 L850.34 135.81 A7493.73 7493.73 0 0 1 1739.23 170.4 L1739.23 170.4 A668.07 668.07 0 0 1 1835.74 235.88 C1848.13 246.01 1859.97 256.56 1871.14 267.65 Z",1360.7]],"x0":92,"x1":1870,"xs0":146,"xs1":1812,"th":91.0,"q":[5.51442e-05,-0.112278,239.043]},{"d":"M791.08 297.88 L823.15 367.94 Q417.81 373.12 12.47 401.53 A269.2 269.2 0 0 1 54.24 316.63 L54.53 316.23 Q133.48 309.05 212.42 303.2 L212.42 334.83 L371.5 334.83 L371.5 292.51 Q576.33 280.27 781.2 275.94 C784.23 283.27 787.93 290.55 791.08 297.88 Z M1162.68 274.76 L1162.68 367.65 Q1006.6 365.91 850.42 367.65 L850.42 274.68 Q1006.53 272.43 1162.68 274.76 Z M1278.47 277.09 Q1436.43 281.12 1594.47 290 L1594.47 379.04 Q1444.68 372.72 1294.82 369.68 A274.79 274.79 0 0 0 1293.97 332.28 A145.42 145.42 0 0 0 1283.65 287.67 A84.31 84.31 0 0 0 1278.47 277.09 Z M1953.9 398.65 Q1867.96 392.8 1781.95 388.14 Q1780.29 378.34 1778.03 368.61 A211.68 211.68 0 0 0 1750.36 299.91 Q1830.16 305.54 1909.95 312.38 A320.59 320.59 0 0 1 1929.48 342.2 A253.78 253.78 0 0 1 1953.9 398.65 Z","p":[["M791.08 297.88 L823.15 367.94 Q417.81 373.12 12.47 401.53 A269.2 269.2 0 0 1 54.24 316.63 L54.53 316.23 Q133.48 309.05 212.42 303.2 L212.42 334.83 L371.5 334.83 L371.5 292.51 Q576.33 280.27 781.2 275.94 C784.23 283.27 787.93 290.55 791.08 297.88 Z",417.8],["M1162.68 274.76 L1162.68 367.65 Q1006.6 365.91 850.42 367.65 L850.42 274.68 Q1006.53 272.43 1162.68 274.76 Z",1006.6],["M1278.47 277.09 Q1436.43 281.12 1594.47 290 L1594.47 379.04 Q1444.68 372.72 1294.82 369.68 A274.79 274.79 0 0 0 1293.97 332.28 A145.42 145.42 0 0 0 1283.65 287.67 A84.31 84.31 0 0 0 1278.47 277.09 Z",1436.5],["M1953.9 398.65 Q1867.96 392.8 1781.95 388.14 Q1780.29 378.34 1778.03 368.61 A211.68 211.68 0 0 0 1750.36 299.91 Q1830.16 305.54 1909.95 312.38 A320.59 320.59 0 0 1 1929.48 342.2 A253.78 253.78 0 0 1 1953.9 398.65 Z",1852.1]],"x0":13,"x1":1954,"xs0":22,"xs1":1939,"th":92.0,"q":[5.25255e-05,-0.110697,377.344]},{"d":"M1594.4 423.29 L1594.4 512.63 Q803.84 495.31 13.25 524.35 A216.56 216.56 0 0 1 4.74 477.3 A22.94 22.94 0 0 0 3.93 473.6 L3.93 448.74 C4.22 446.7 4.48 444.63 4.7 442.6 Q424.32 417.77 844.02 413.78 L850.34 413.78 Q1006.49 412.34 1162.6 413.78 L1162.6 465.57 A19.72 19.72 0 0 0 1165.05 465.9 C1186.06 465.9 1207.07 466.12 1227.94 465.9 A55.12 55.12 0 0 0 1270.03 447.41 A84.31 84.31 0 0 0 1287.2 415.67 L1316.79 416.18 Q1378.83 417.29 1440.87 418.92 L1479.23 419.96 L1517.63 421.1 C1530.43 421.47 1543.2 421.88 1556 422.32 Z M1954.23 522.95 Q1870.4 519.91 1786.54 517.51 A580.8 580.8 0 0 0 1788.13 457.43 C1788.13 448.63 1787.58 439.82 1786.95 431.09 Q1874.47 435.16 1961.96 440.12 C1962.41 444.96 1962.74 449.88 1962.89 454.92 A220.48 220.48 0 0 1 1954.23 522.95 Z","p":[["M1594.4 423.29 L1594.4 512.63 Q803.84 495.31 13.25 524.35 A216.56 216.56 0 0 1 4.74 477.3 A22.94 22.94 0 0 0 3.93 473.6 L3.93 448.74 C4.22 446.7 4.48 444.63 4.7 442.6 Q424.32 417.77 844.02 413.78 L850.34 413.78 Q1006.49 412.34 1162.6 413.78 L1162.6 465.57 A19.72 19.72 0 0 0 1165.05 465.9 C1186.06 465.9 1207.07 466.12 1227.94 465.9 A55.12 55.12 0 0 0 1270.03 447.41 A84.31 84.31 0 0 0 1287.2 415.67 L1316.79 416.18 Q1378.83 417.29 1440.87 418.92 L1479.23 419.96 L1517.63 421.1 C1530.43 421.47 1543.2 421.88 1556 422.32 Z",799.2],["M1954.23 522.95 Q1870.4 519.91 1786.54 517.51 A580.8 580.8 0 0 0 1788.13 457.43 C1788.13 448.63 1787.58 439.82 1786.95 431.09 Q1874.47 435.16 1961.96 440.12 C1962.41 444.96 1962.74 449.88 1962.89 454.92 A220.48 220.48 0 0 1 1954.23 522.95 Z",1874.8]],"x0":4,"x1":1963,"xs0":4,"xs1":1962,"th":91.0,"q":[1.5447e-05,-0.027649,474.973]},{"d":"M29.56 564.86 Q356.33 556.43 683.09 553.76 L683.09 645.84 Q527.39 646.1 371.68 646.62 L371.68 594.27 L212.64 594.27 L212.64 647.02 L88.94 647.54 A331.02 331.02 0 0 1 29.56 564.86 Z M1594.4 556.94 L1594.4 646.4 L1421.82 645.95 L1421.82 584.62 A32.33 32.33 0 0 0 1419.9 587.35 A250.63 250.63 0 0 1 1376.58 645.88 Q1059.87 645.25 743.24 645.69 Q722.2 599.56 701.11 553.54 Q1147.84 549.95 1594.4 556.94 Z M1938.44 563.86 A331.13 331.13 0 0 1 1878.51 647.47 Q1812.99 647.14 1747.44 646.91 C1748.55 645.32 1749.62 643.69 1750.66 642.07 C1766.71 616.87 1775.59 589.17 1780.92 560.31 Q1859.6 561.94 1938.44 563.86 Z","p":[["M29.56 564.86 Q356.33 556.43 683.09 553.76 L683.09 645.84 Q527.39 646.1 371.68 646.62 L371.68 594.27 L212.64 594.27 L212.64 647.02 L88.94 647.54 A331.02 331.02 0 0 1 29.56 564.86 Z",356.3],["M1594.4 556.94 L1594.4 646.4 L1421.82 645.95 L1421.82 584.62 A32.33 32.33 0 0 0 1419.9 587.35 A250.63 250.63 0 0 1 1376.58 645.88 Q1059.87 645.25 743.24 645.69 Q722.2 599.56 701.11 553.54 Q1147.84 549.95 1594.4 556.94 Z",1147.8],["M1938.44 563.86 A331.13 331.13 0 0 1 1878.51 647.47 Q1812.99 647.14 1747.44 646.91 C1748.55 645.32 1749.62 643.69 1750.66 642.07 C1766.71 616.87 1775.59 589.17 1780.92 560.31 Q1859.6 561.94 1938.44 563.86 Z",1842.9]],"x0":30,"x1":1938,"xs0":42,"xs1":1921,"th":92.0,"q":[-9.45419e-06,0.0220684,586.007]},{"d":"M132.85 688.01 L212.64 688.35 L212.64 742.62 A20.86 20.86 0 0 1 209.61 741.43 A647.39 647.39 0 0 1 132.85 688.01 Z M371.53 688.9 Q527.24 689.46 682.94 689.68 L682.94 781.79 Q527.24 780.5 371.5 777.87 Q371.57 733.44 371.53 688.9 Z M1421.6 780.87 Q1329.93 781.87 1238.29 782.42 Q1224.53 745.02 1210.77 707.62 A5.55 5.55 0 0 0 1204.44 703.25 C1190.72 703.51 1176.96 703.25 1162.68 703.25 C1162.68 705.47 1162.38 707.47 1162.38 709.43 L1162.38 782.72 Q984.15 783.42 805.95 782.49 Q784.75 736.03 763.48 689.68 Q1075.34 690.05 1387.19 689.42 Q1403.69 733.48 1420.04 777.54 C1420.52 778.54 1420.86 779.39 1421.6 780.87 Z M1834.19 688.2 A691.78 691.78 0 0 1 1718.92 763.26 Q1705.6 770.29 1692.06 776.91 Q1556.99 779.35 1422 780.87 L1422 689.46 Q1508.27 689.46 1594.58 689.05 Q1643.49 689.05 1692.32 688.72 L1692.32 688.72 Z","p":[["M132.85 688.01 L212.64 688.35 L212.64 742.62 A20.86 20.86 0 0 1 209.61 741.43 A647.39 647.39 0 0 1 132.85 688.01 Z",172.7],["M371.53 688.9 Q527.24 689.46 682.94 689.68 L682.94 781.79 Q527.24 780.5 371.5 777.87 Q371.57 733.44 371.53 688.9 Z",527.2],["M1421.6 780.87 Q1329.93 781.87 1238.29 782.42 Q1224.53 745.02 1210.77 707.62 A5.55 5.55 0 0 0 1204.44 703.25 C1190.72 703.51 1176.96 703.25 1162.68 703.25 C1162.68 705.47 1162.38 707.47 1162.38 709.43 L1162.38 782.72 Q984.15 783.42 805.95 782.49 Q784.75 736.03 763.48 689.68 Q1075.34 690.05 1387.19 689.42 Q1403.69 733.48 1420.04 777.54 C1420.52 778.54 1420.86 779.39 1421.6 780.87 Z",1092.5],["M1834.19 688.2 A691.78 691.78 0 0 1 1718.92 763.26 Q1705.6 770.29 1692.06 776.91 Q1556.99 779.35 1422 780.87 L1422 689.46 Q1508.27 689.46 1594.58 689.05 Q1643.49 689.05 1692.32 688.72 L1692.32 688.72 Z",1628.1]],"x0":134,"x1":1834,"xs0":206,"xs1":1759,"th":91.0,"q":[1.44468e-05,-0.0279543,744.451]},{"d":"M382.82 822.12 Q532.86 825.81 682.94 827.41 L682.94 896.36 C675.55 895.29 668.89 894.36 662.15 893.25 A1607.93 1607.93 0 0 1 434.68 839.87 C417.18 834.32 400.17 828.07 382.82 822.12 Z M1162.38 828.85 L1162.38 904.43 C1162.38 912.16 1162.38 910.9 1156.09 911.23 C1114.77 913.42 1073.49 916.34 1032.17 917.45 C995.17 918.48 957.96 917.71 920.85 917.45 C904.17 917.26 887.56 916.12 870.8 915.56 A5.88 5.88 0 0 1 864.84 911.53 Q845.9 870.17 827.04 828.81 Q994.73 829.85 1162.38 828.85 Z M1582.37 823.15 C1545.75 836.32 1508.38 847.75 1470.73 857.92 A1706.56 1706.56 0 0 1 1282.06 896.77 L1280.61 896.77 C1278.21 890.37 1275.69 883.78 1273.22 877.2 L1255.2 828.29 Q1418.79 826.67 1582.37 823.15 Z","p":[["M382.82 822.12 Q532.86 825.81 682.94 827.41 L682.94 896.36 C675.55 895.29 668.89 894.36 662.15 893.25 A1607.93 1607.93 0 0 1 434.68 839.87 C417.18 834.32 400.17 828.07 382.82 822.12 Z",532.9],["M1162.38 828.85 L1162.38 904.43 C1162.38 912.16 1162.38 910.9 1156.09 911.23 C1114.77 913.42 1073.49 916.34 1032.17 917.45 C995.17 918.48 957.96 917.71 920.85 917.45 C904.17 917.26 887.56 916.12 870.8 915.56 A5.88 5.88 0 0 1 864.84 911.53 Q845.9 870.17 827.04 828.81 Q994.73 829.85 1162.38 828.85 Z",994.7],["M1582.37 823.15 C1545.75 836.32 1508.38 847.75 1470.73 857.92 A1706.56 1706.56 0 0 1 1282.06 896.77 L1280.61 896.77 C1278.21 890.37 1275.69 883.78 1273.22 877.2 L1255.2 828.29 Q1418.79 826.67 1582.37 823.15 Z",1418.8]],"x0":384,"x1":1581,"xs0":404,"xs1":1558,"th":81.0,"q":[-0.000121816,0.240193,752.341]}]};
function hnrdIntro(root, opt = {}) {
    const o = Object.assign({
      speed: 1,        // násobok rýchlosti
      stagger: 120,    // ms medzi líniami pri skladaní
      thin: 2,         // hrúbka letiacej línie (px)
      size: 0.7,       // šírka loga ako podiel šírky obrazovky (max 1100px)
      alternate: true, // striedať ľavá / pravá
      push: 0,         // sila odrazu susedných pruhov pri kliku (0 = vypnuté)
      touchRadius: 1,  // na telefóne sa rozbije aj toľko pruhov nad a pod prstom
      enterText: '',   // ak je vyplnené: pod logom bliká text, klik na text = vstup do shopu
      idleTwitch: false, // true = logo sa v pokoji občas nenápadne trhne
      shirtExit: false, // true = pri vstupe do shopu na chvíľu hrubé pásy cez obrazovku
      shopUrl: '',     // kam presmerovať (prázdne = len demo, logo sa znova zloží)
      clickAll: false, // true = klik na logo rozpadne CELÉ logo a znova ho poskladá (ako príchod/odchod)
      raise: 0,        // posun loga nahor (násobok výšky loga), napr. keď je pod ním COMING SOON
      onEnter: null,   // funkcia po rozpade pri vstupe (napr. zavretie landing page) – má prednosť pred shopUrl
      mini: false,     // malé logo (napr. v navigácii): vyplní box, línie letia len kúsok za jeho okraje
      reach: 0.6,      // mini: ako ďaleko za box línie siahajú (násobok šírky boxu)
      animate: true,   // mini: false = rovno hotové logo bez úvodnej animácie
    }, opt);
  
    const D = HNRD_DATA, ns = 'http://www.w3.org/2000/svg', N = D.s.length;
    const el = (n, a = {}) => { const e = document.createElementNS(ns, n); for (const k in a) e.setAttribute(k, a[k]); return e; };
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    root.innerHTML = '';
  
    // ---- rozmery: logo v strede, na mobile väčšie, nikdy nie vyššie ako ~55 % výšky ----
    const R = root.getBoundingClientRect();
    const size = R.width < 700 ? Math.max(o.size, 0.88) : o.size;
    const lw = o.mini ? Math.min(R.width, R.height * D.w / D.h) : Math.min(R.width * size, 1100, R.height * 0.55 * D.w / D.h), k = lw / D.w, lh = D.h * k;
    const lx = (R.width - lw) / 2, ly = (R.height - lh) / 2 - (o.enterText ? lh * 0.06 : 0) - (o.raise || 0) * lh;
  
    const svg = el('svg', { viewBox: `0 0 ${R.width} ${R.height}`, role: 'img', 'aria-label': 'HNRD' });
    const defs = el('defs'), g = el('g');
    const LG = { s: 1 };   // "dosadnutie" celého loga
    const placeLogo = () => { const s = LG.s, cx = lx + lw / 2, cy = ly + lh / 2;
      g.setAttribute('transform', `translate(${cx - lw * s / 2} ${cy - lh * s / 2}) scale(${k * s})`); };
    placeLogo();
    svg.append(defs, g); root.appendChild(svg);
    if (o.mini) svg.style.overflow = 'visible';
  
    const touch = matchMedia('(pointer: coarse)').matches || R.width < 700;
    const fancy = !touch && !o.mini;   // rozmazanie pohybom + reakcia na myš len na počítači
  
    // ---- easingy ----
    const E = {
      outExpo: t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
      inExpo: t => t === 0 ? 0 : Math.pow(2, 10 * t - 10),
      inOut: t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
      inOutQuint: t => t < .5 ? 16 * t ** 5 : 1 - Math.pow(-2 * t + 2, 5) / 2,
      out: t => 1 - Math.pow(1 - t, 3),
      elastic: t => t === 0 || t === 1 ? t : Math.pow(2, -9 * t) * Math.sin((t * 10 - .75) * (2 * Math.PI / 3)) + 1,
    };
  
    // ---- mini tween engine (requestAnimationFrame) ----
    let tw = [], raf = 0, alive = true, settled = false;
    const PX = { x: 0, amp: 0 };   // reakcia na myš
    const kick = () => { if (!raf && alive) raf = requestAnimationFrame(loop); };
    const T = ms => ms / o.speed;
    function tween(obj, to, dur, ease = E.inOut, delay = 0) {
      return new Promise(res => {
        if (!alive) return;
        tw = tw.filter(x => { if (x.obj === obj && Object.keys(to).some(p => p in x.to)) { x.res(); return false; } return true; });
        tw.push({ obj, to, dur: T(dur), ease, start: performance.now() + T(Math.max(0, delay)), from: null, res });
        if (!raf) raf = requestAnimationFrame(loop);
      });
    }
    const wait = ms => tween({}, {}, ms);
    function loop(now) {
      tw = tw.filter(t => {
        if (now < t.start) return true;
        if (!t.from) { t.from = {}; for (const p in t.to) t.from[p] = t.obj[p]; }
        const p = Math.min(1, (now - t.start) / (t.dur || 1)), e = t.ease(p);
        for (const q in t.to) t.obj[q] = t.from[q] + (t.to[q] - t.from[q]) * e;
        if (p >= 1) { t.res(); return false; }
        return true;
      });
      let moving = false;
      S.forEach(st => {
        const target = (!st.busy && settled) ? PX.x * PX.amp * (st.i % 2 ? 1 : -1) * (0.55 + 0.45 * Math.abs(st.i - (N - 1) / 2) / ((N - 1) / 2)) : 0;
        st.px += (target - st.px) * 0.09;
        if (Math.abs(target - st.px) > 0.05) moving = true; else st.px = target;
        render(st);
      });
      placeLogo();
      raf = (tw.length || moving) && alive ? requestAnimationFrame(loop) : 0;
    }
  
    // ---- pruhy ----
    // XL / XR = ľavý a pravý okraj obrazovky v súradniciach loga (s malou rezervou)
    const XL = o.mini ? -(lx + o.reach * R.width) / k : -lx / k - 20;
    const XR = o.mini ? (R.width * (1 + o.reach) - lx) / k : (R.width - lx) / k + 20;
    const S = D.s.map((s, i) => {
      const [a2, a1, a0] = s.q, f = x => a2 * x * x + a1 * x + a0, df = x => 2 * a2 * x + a1;
      // stredová krivka línie: v logu presný oblúk pruhu, mimo neho plynulo (bez zlomu) dobieha do vodorovnej
      const tau = 70;
      const Y = x => x < s.xs0 ? f(s.xs0) - df(s.xs0) * tau * (1 - Math.exp(-(s.xs0 - x) / tau))
                   : x > s.xs1 ? f(s.xs1) + df(s.xs1) * tau * (1 - Math.exp(-(x - s.xs1) / tau)) : f(x);
      const id = Math.random().toString(36).slice(2, 7);
      const grp = el('g');
      // maska: logo pruhu je viditeľné len v "štrbine" okolo krivky → pri malej hrúbke vyzerá ako línia
      const mask = el('mask', { id: `hnrd-m${i}-${id}`, maskUnits: 'userSpaceOnUse', x: -1e4, y: -1e4, width: 3e4, height: 3e4 });
      const slit = el('path', { fill: 'none', stroke: '#fff', 'stroke-linecap': 'butt', 'stroke-linejoin': 'round' });
      mask.appendChild(slit); defs.appendChild(mask);
      // logo pruhu = jednotlivé dieliky (kúsky medzi písmenami), každý sa vie posunúť zvlášť
      const fill = el('g', { class: 'fill', mask: `url(#hnrd-m${i}-${id})` });
      const pieces = s.p.map(([d, cx]) => { const e = el('path', { d }); fill.appendChild(e); return { e, cx, o: 0 }; });
      const tl = el('path', { class: 'band' }), tr = el('path', { class: 'band' });   // časti línie mimo loga
      let blur = null;
      if (fancy) {
        const fl = el('filter', { id: `hnrd-b${i}-${id}`, x: '-20%', y: '-50%', width: '140%', height: '200%' });
        blur = el('feGaussianBlur', { stdDeviation: '0 0' });
        fl.appendChild(blur); defs.appendChild(fl); blur._url = `url(#${fl.id})`;
      }
      const tails = el('g'); tails.append(tl, tr);   // rozmazanie len na letiacich líniách, nie na logu
      grp.append(fill, tails); g.appendChild(grp);
      // a,b = kam už línia dobehla · h = výška štrbiny (roztvorenie loga) · L,Rr = vnútorné konce bočných línií
      return { i, s, Y, pieces, tails, sp: 0, sx: 0, amp: 0, k1: '', k2: '', ym: f((s.x0 + s.x1) / 2), flat: 0, th: s.th, grp, slit, fill, tl, tr, blur, x0: s.xs0, x1: s.xs1,
               a: XL, b: XL, h: 0, w: 0, L: s.xs0, Rr: s.xs1, dx: 0, px: 0, pv: 0, busy: false, open: false,
               jit: [0.94, 1.06, 0.9, 1, 1.08, 0.92, 1.03][i % 7] };
    });
    const thin = () => o.thin / k;
  
    const seg = (Y, x0, x1, n) => { const p = []; for (let j = 0; j <= n; j++) { const x = x0 + (x1 - x0) * j / n; p.push(x.toFixed(1) + ' ' + Y(x).toFixed(1)); } return 'M' + p.join('L'); };
    function render(st) {
      // kreslí sa len to, čo sa naozaj zmenilo → hladšie aj na slabšom telefóne
      const k1 = [st.a, st.b, st.h, st.w, st.L, st.Rr, st.flat, st.open].join();
      const k2 = [st.dx, st.px, st.sp, st.sx, st.amp].join();
      if (k2 !== st.k2) {
        st.k2 = k2;
        st.grp.setAttribute('transform', `translate(${st.dx + st.px} 0)`);
        // dieliky sa rozostúpia od miesta kliknutia: bližšie = viac
        st.pieces.forEach(p => {
          const d = p.cx - st.sx, o = st.sp ? st.sp * st.amp * Math.sign(d || 1) * Math.exp(-Math.abs(d) / 520) : 0;
          if (Math.abs(o - p.o) > 0.01) { p.o = o; p.e.setAttribute('transform', o ? `translate(${o.toFixed(2)} 0)` : ''); }
        });
      }
      if (st.blur) {
        const v = Math.abs(st.a + st.b + st.L + st.Rr - st.pv);
        const sd = Math.min(v * 0.3, 40);
        if (sd > 0.3) { st.blur.setAttribute('stdDeviation', `${sd.toFixed(1)} 0`); if (!st.lastBlur) st.tails.setAttribute('filter', st.blur._url); st.lastBlur = true; }
        else if (st.lastBlur) { st.tails.removeAttribute('filter'); st.lastBlur = false; }   // filter vypnutý, keď nie je pohyb
      }
      st.pv = st.a + st.b + st.L + st.Rr;
      if (k1 === st.k1) return;
      st.k1 = k1;
      const { a, b } = st;
      const Y = st.flat ? (x => st.Y(x) + st.flat * (st.ym - st.Y(x))) : st.Y;   // flat = narovnanie do rovných pásov
      // ľavá a pravá časť línie (mimo loga)
      const l0 = Math.max(a, XL), l1 = Math.min(b, st.L), r0 = Math.max(a, st.Rr), r1 = Math.min(b, XR);
      if (l1 - l0 > 0.5 && st.w > 0) { st.tl.setAttribute('d', seg(Y, l0, l1, 24)); st.tl.style.strokeWidth = st.w; st.tl.style.display = ''; } else st.tl.style.display = 'none';
      if (r1 - r0 > 0.5 && st.w > 0) { st.tr.setAttribute('d', seg(Y, r0, r1, 24)); st.tr.style.strokeWidth = st.w; st.tr.style.display = ''; } else st.tr.style.display = 'none';
      // stredná časť = samotné logo cez štrbinu
      if (st.open) { st.fill.removeAttribute('mask'); }
      else {
        st.fill.setAttribute('mask', `url(#${st.slit.parentNode.id})`);
        const m0 = Math.max(a, st.x0 - 2), m1 = Math.min(b, st.x1 + 2);
        if (m1 - m0 > 0.5 && st.h > 0) { st.slit.setAttribute('d', seg(Y, m0, m1, 40)); st.slit.style.strokeWidth = st.h; st.slit.style.display = ''; }
        else st.slit.style.display = 'none';
      }
    }
    const showLogo = st => { st.open = true; st.w = 0; };
    const hideLogo = st => { st.open = false; };
  
    // ===== ZLOŽENIE =====
    // 1) línia vystrelí z boku cez celú obrazovku – v strede už ide po oblúku loga a má v sebe medzery po písmenách
    // 2) línia sa v logu roztvorí do výšky → vyklopí sa celý pruh loga
    // 3) zvyšky línie mimo loga sa zároveň stiahnu za okraje obrazovky
    async function assemble(st, fromLeft, t = { line: 0, open: 900 }) {
      st.busy = true;
      hideLogo(st);
      Object.assign(st, fromLeft ? { a: XL, b: XL } : { a: XR, b: XR }, { flat: 0, w: thin(), h: thin(), L: st.x0 + 1, Rr: st.x1 - 1, dx: 0 });
      st.pv = st.a + st.b + st.L + st.Rr;
      render(st);
      const j = st.jit;   // každá línia má trochu iný "charakter" → pohyb pôsobí organicky
      const open = Math.max(t.open, t.line + 700);
      tween(st, fromLeft ? { b: XR } : { a: XL }, 900 * j, E.outExpo, t.line);
      tween(st, { h: st.th * 2.4 }, 1150 * (2 - j), E.inOutQuint, open);
      await tween(st, { L: XL, Rr: XR }, 1050 * j, E.inOutQuint, open + 120 * j);
      showLogo(st); render(st); st.busy = false;
    }
  
    // ===== ROZPAD (opačný pohyb) =====
    // bočné línie dobehnú k logu → logo sa zavrie do tenkej línie → línia vystrelí z obrazovky
    async function disassemble(st, toLeft, delay = 0, shirt = false) {
      await wait(delay);
      hideLogo(st);
      Object.assign(st, { a: XL, b: XR, w: thin(), h: st.th * 2.4, L: XL, Rr: XR, flat: 0 });
      st.pv = st.a + st.b + st.L + st.Rr;
      tween(st, { L: st.x0 + 1, Rr: st.x1 - 1 }, 620, E.inOutQuint);
      await tween(st, { h: thin() }, 700, E.inOutQuint, 60);
      if (shirt) {   // vstup do shopu: na chvíľu celá obrazovka ako pruhované tričko
        Object.assign(st, { L: XR, Rr: XR, h: 0 });           // celá línia = bočná časť (bez loga)
        await tween(st, { w: st.th, flat: 1 }, 480, E.inOutQuint);
        await wait(160);
      }
      await tween(st, toLeft ? { b: XL } : { a: XR }, 600, E.inExpo, 60);
    }
  
    // klik na pruh: trhnutie → rozpad → poskladanie z tej istej strany
    async function breakStripe(st, toLeft) {
      st.busy = true;
      await disassemble(st, toLeft);
      await assemble(st, toLeft, { line: 160, open: 900 });
    }
  
    // susedné pruhy sa jemne odrazia a pružne vrátia
    async function nudge(st, dir, amount, delay) {
      if (st.busy || !amount) return;
      st.busy = true;
      await tween(st, { dx: dir * amount }, 140, E.out, delay);
      await tween(st, { dx: 0 }, 900, E.elastic);
      st.busy = false;
    }
  
    // ---- klik na logo: rozbije sa len pruh pod kurzorom ----
    const hit = el('rect', { class: 'hit', x: 0, y: 0, width: D.w, height: D.h });
    g.appendChild(hit);
    if (o.mini) hit.style.pointerEvents = 'none';
    else hit.addEventListener('click', e => {
      if (entering) return;
      if (o.clickAll) {   // celé logo odíde v líniách a znova priletí
        if (rebuilding || !settled || S.some(st => st.busy)) return;
        rebuilding = true; settled = false;
        if (label) { label.classList.remove('on', 'in'); label.classList.add('off'); }
        if (touch && navigator.vibrate) try { navigator.vibrate(8); } catch (err) {}
        (async () => {
          await Promise.all(S.map((st, i) => { st.busy = true; return disassemble(st, i % 2 === 0, Math.abs(i - (N - 1) / 2) * 55); }));
          await wait(250);
          if (label) label.classList.remove('off');
          await intro();
          rebuilding = false;
        })();
        return;
      }
      const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY;
      const q = p.matrixTransform(g.getScreenCTM().inverse());
      let best = null, bd = Infinity;
      S.forEach(st => { const [a2, a1, a0] = st.s.q, d = Math.abs(a2 * q.x * q.x + a1 * q.x + a0 - q.y); if (d < bd) { bd = d; best = st; } });
      if (!best || bd > best.th * (touch ? 1.6 : 0.8)) return;
      // klik: 2–3 pruhy okolo miesta kliku sa zavrú do línií, odletia a vrátia sa (ako príchod / odchod)
      const toLeft = q.x > (best.s.x0 + best.s.x1) / 2;
      const reach = (touch ? 2.2 : 1.6) * best.th;   // ktoré pruhy sú "pod klikom"
      S.forEach(st => {
        const [a2, a1, a0] = st.s.q, d = Math.abs(a2 * q.x * q.x + a1 * q.x + a0 - q.y);
        if (d > reach || st.busy) return;
        st.busy = true;
        const n = st.i - best.i;
        setTimeout(() => breakStripe(st, n === 0 ? toLeft : (n % 2 ? !toLeft : toLeft)), Math.abs(n) * 70);
      });
      if (touch && navigator.vibrate) try { navigator.vibrate(8); } catch (e) {}
    });
  
    // ---- logo v pokoji "žije": raz za čas sa niektorý pruh nenápadne trhne ----
    let hover = false;
    (function idle() {
      if (!alive) return;
      setTimeout(async () => {
        if (o.idleTwitch && alive && settled && !hover && !reduce && document.visibilityState === 'visible') {
          const st = S[Math.floor(Math.random() * N)];
          if (!st.busy) {
            st.busy = true; const d = (Math.random() < .5 ? -1 : 1) * 10 / k;
            await tween(st, { dx: d }, 60, E.out); await tween(st, { dx: -d * .5 }, 60, E.out);
            await tween(st, { dx: 0 }, 420, E.elastic); st.busy = false;
          }
        }
        idle();
      }, 3500 + Math.random() * 3500);
    })();
  
    // ---- reakcia na myš: susedné pruhy sa posúvajú proti sebe (len počítač) ----
    if (fancy) {
      PX.amp = 14 / k;
      root.addEventListener('pointerenter', () => { hover = true; });
      root.addEventListener('pointermove', e => { hover = true; PX.x = Math.max(-1, Math.min(1, (e.clientX - R.left - R.width / 2) / (R.width / 2))); kick(); });
      root.addEventListener('pointerleave', () => { hover = false; PX.x = 0; kick(); });
    }
  
    // ---- text "click to enter shop": celé logo sa naraz rozpadne → presmerovanie ----
    let label, entering = false, rebuilding = false;
    if (o.enterText) {
      label = document.createElement('div'); label.className = 'enter';
      const btn = document.createElement('span'); btn.setAttribute('role', 'link'); btn.tabIndex = 0;
      btn.setAttribute('aria-label', o.enterText);
      [...o.enterText].forEach((ch, j) => { const c = document.createElement('i'); c.textContent = ch === ' ' ? '\u00a0' : ch; c.style.transitionDelay = (j * 28) + 'ms'; btn.appendChild(c); });
      label.appendChild(btn);
      label.style.top = Math.min(R.height - 56, ly + lh + Math.max(32, lh * 0.16)) + 'px';
      root.appendChild(label);
      const go = async () => {
        if (entering || !label.classList.contains('in')) return;
        entering = true; settled = false; kick();
        label.classList.remove('on', 'in'); label.classList.add('off');
        // rozpad od stredu von, strany sa striedajú
        await Promise.all(S.map((st, i) => { st.busy = true; return disassemble(st, i % 2 === 0, Math.abs(i - (N - 1) / 2) * 55, o.shirtExit); }));
        if (o.onEnter) { o.onEnter(); return; }
        if (o.shopUrl) { location.href = o.shopUrl; return; }
        await wait(450);   // demo bez URL: znova zložiť
        await intro();
        entering = false;
      };
      btn.addEventListener('click', go);
      btn.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    }
  
    // ---- úvod: línie postupne priletia → všetky naraz zhrubnú (úder) → stierače postupne odkryjú logo ----
    async function intro() {
      settled = false;
      if (label) { label.classList.remove('on', 'off', 'in'); }
      const st0 = o.stagger, lastLine = (N - 1) * st0;
      const open0 = lastLine + 620;                 // úder: logo sa roztvorí z línií, od stredu von
      await Promise.all(S.map((st, i) => assemble(st, o.alternate ? i % 2 === 0 : true,
        { line: i * st0 + [0, 40, -20, 30, -30, 20, -10][i % 7], open: open0 + Math.abs(i - (N - 1) / 2) * 55 })));
      settled = true;
      if (o.shopUrl && !document.querySelector('link[data-hnrd-prefetch]')) {   // shop sa načíta na pozadí
        const l = document.createElement('link'); l.rel = 'prefetch'; l.href = o.shopUrl; l.dataset.hnrdPrefetch = 1; document.head.appendChild(l);
        if (HTMLScriptElement.supports && HTMLScriptElement.supports('speculationrules')) {
          const sr = document.createElement('script'); sr.type = 'speculationrules';
          sr.textContent = JSON.stringify({ prerender: [{ source: 'list', urls: [o.shopUrl] }] }); document.head.appendChild(sr);
        }
      }
      if (label && alive) { label.classList.add('in'); setTimeout(() => alive && label.classList.add('on'), 900); }
    }
  
    // mini: pri prejdení myšou sa pruhy jemne rozostúpia (striedavo doľava / doprava) a po odchode sa vrátia
    if (o.mini && !reduce) {
      const tgt = root.closest('a') || root, amt = 4 / k;
      tgt.addEventListener('pointerenter', () => { if (!settled) return; S.forEach((st, i) => tween(st, { dx: (i % 2 ? 1 : -1) * amt * (1 + Math.abs(i - (N - 1) / 2) * 0.25) }, 260, E.out, Math.abs(i - (N - 1) / 2) * 25)); });
      tgt.addEventListener('pointerleave', () => { S.forEach((st, i) => tween(st, { dx: 0 }, 480, E.inOut, Math.abs(i - (N - 1) / 2) * 20)); });
    }
  
    if (reduce || (o.mini && !o.animate)) { S.forEach(st => { showLogo(st); st.w = 0; render(st); }); if (label) label.classList.add('in', 'on'); settled = true; }
    else intro();
  
    return { stop() { alive = false; tw = []; cancelAnimationFrame(raf); raf = 0; } };
  }
  
  
  window.HNRDLogo = {
    intro: hnrdIntro,
    mount: function (el, opt) { el.classList.add('hnrd-logo'); return hnrdIntro(el, opt || {}); }
  };
})();
