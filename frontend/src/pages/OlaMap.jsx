import { useEffect } from "react";
import { OlaMaps } from "olamaps-web-sdk";

const OlaMap = () => {
    useEffect(() => {
        // Initialize Ola Maps with API Key
        const olaMaps = new OlaMaps({
            apiKey: import.meta.env.VITE_OLAMAPS_API_KEY, // Replace with your API key
        });

        // Render the map
        const myMap = olaMaps.init({
            style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
            container: "map", // ID of the div where map will be rendered
            center: [78.0493, 30.3882], // Centered between Mussoorie and Dehradun
            zoom: 10,
        });

        // Add marker for Mussoorie
        const mussoorieMarker = olaMaps
            .addMarker({ color: "red" }) // Red marker
            .setLngLat([78.0643, 30.4597]) // Mussoorie coordinates
            .addTo(myMap);

        const mussooriePopup = olaMaps
            .addPopup({ offset: [0, -10] }) // Adjust offset
            .setText("Mussoorie, Uttarakhand");

        mussoorieMarker.setPopup(mussooriePopup);

        // Add marker for Dehradun
        const dehradunMarker = olaMaps
            .addMarker({ color: "green" }) // Green marker
            .setLngLat([78.034336, 30.316823]) // Dehradun coordinates
            .addTo(myMap);

        const dehradunPopup = olaMaps
            .addPopup({ offset: [0, -10] }) // Adjust offset
            .setText("Dehradun, Uttarakhand");

        dehradunMarker.setPopup(dehradunPopup);

        // Function to decode Ola Maps polyline
        function decodePolyline(encoded) {
            let coordinates = [];
            let index = 0,
                len = encoded.length;
            let lat = 0,
                lng = 0;

            while (index < len) {
                let shift = 0,
                    result = 0,
                    byte;
                do {
                    byte = encoded.charCodeAt(index++) - 63;
                    result |= (byte & 0x1f) << shift;
                    shift += 5;
                } while (byte >= 0x20);
                let deltaLat = (result & 1) ? ~(result >> 1) : result >> 1;
                lat += deltaLat;

                shift = 0;
                result = 0;
                do {
                    byte = encoded.charCodeAt(index++) - 63;
                    result |= (byte & 0x1f) << shift;
                    shift += 5;
                } while (byte >= 0x20);
                let deltaLng = (result & 1) ? ~(result >> 1) : result >> 1;
                lng += deltaLng;

                coordinates.push([lng / 1e5, lat / 1e5]); // Convert to decimal degrees
            }

            return coordinates;
        }

        // Example encoded polyline from Ola Maps API
        const encodedPolyline = "}c|xD}|m{MCOO[II@S?YAYEa@KwA?G@IF_@?IAGEKOSCMAM?O?q@FQFIFGd@YTOPOFMNa@HMLOf@g@VMLEN?|@?LAHCXa@DQDM@M?MOc@?ODOFQHMfAeADG@I?ICIEEIAY@UAMEOGKKISW}AAIAI@MTiADa@BQBEXo@FOBMBOLcABIBGHId@YZMFA|@GHALEZUJCJCVCJEFEHIz@cALMDGDKHUHWRm@N[FMLQl@q@`@g@PYN[BEDGlAgABEBE?M?WC_@?I?EDU?K?K?a@DYJ[L[NUPQLI`@QPC~@OLGHGFOBSCe@Ok@Ie@AM?ODUFUHQd@m@|A{Ax@m@XQTKTINCD?D@DDBFCDGD]FMBIDe@^WPiAnAIHAD@FDDF?D?FETW~AsAJEHCN?tABh@@NBJBRHJ?LCBK@MEOk@s@COCM?OPs@@MAQS{@?QBORYz@o@XSXYPYN[@OAOEMIKw@]MKKYEWAUFUJM^Qh@QVGVEb@IVKDE@GPGB?B?B?B@BF?DADABCBABCBMNMFMBUDSBQDYLEBGFGLABABAL?LDPDJJLNJd@NNNHHHN@F@FC^Ox@Gf@CJND@?B?LGD@B??@@BDP?@@?@?@A@]?AB?@?PZ@?@?@??A@A@I@C@?FBDB@D?FADS\\?@?B@?B@DCDCZYFI@E?CEK?A?A@C@AB?lCXLBJDJFx@bB@DBBDBD?D?D?D@B@BBDHBBD@D@VCJ@J?H@fANF?FCFCDEVYBABABB?B?BYj@GJKHKFs@VABAB@DBDZHJ@J?N?LCHCf@QFIFGFKN[HEJA^JVJLBHAJCJERURk@h@c@PKRUXETH\\TXVLJ\\H^ANAN@XLXX\\Vd@Z\\NXCLERYTi@TW\\Gl@P^Vb@Hd@CREb@S\\_@LQVi@Ng@Ac@M]IMIQKQUi@GUMm@Om@GWGWIWMU]a@Oe@@SNe@Va@Ni@Ni@HONCLBRXLd@Jn@DXDXDTVZLD`@Ed@Id@SPMLKXMPEJBHHFT@\\BTBPFFHFTDJ@b@BPD^TND`@Af@IR?n@ZPf@Jj@DTDTAj@GPQ^A`@BPFNVVND\\Bf@?^EZCXAVAH?VATAHCHARGJCJGVg@BO@e@?U?SIe@EQAO@IDEFAD@DBDBBHBP@h@@T@RF`@FPDP@HAPAJK^?\\DJLPDBJFFDFFPVH^@R?f@?j@Df@Db@@N?PAb@APANK^EFCDQTOXGNIf@CRAd@BNDNJL\\F^MP[BM?OAs@@w@Ju@Pw@FYFm@Ii@Gi@@k@Ao@Ek@AS?M?E?C?C?AAE?CAA?AAIAIEOAEAIAG?MBQBIBGBIDS@YEa@EQIYAQ?MBMJ]R[LMJEHAHBDDFJDPDNRb@XZPd@HVHR^T^GZQ\\SLG\\CZFJHR^HRL`@@NCb@@PBLLPJLNb@Bh@Kj@CPARD^HFLD\\BNFX\\LJ`@JPF^TZNLATQVQLCL?LBLDZPLJRZDNAf@A^LTJBJB\\DVCLKHMBi@?Q?S?QI[GKQc@EUEUMi@M]IKK[GYG_@CY?Y@K@GDCDAHAF@FDRT\\Vb@\\`@b@^`@ZZPBL?PENIRWRo@FWR{@J]NYPWHMHMFI?IEe@EY?SBMBIBEDAFADA@?FDJFZf@Vd@JLPJPFX@V?T?N@H@LFHLDR@TBN@P`@dAJX?VERKRSN]Pa@Vc@b@Yj@G^?ZJn@Nz@Jh@Nf@LVJVLVL\\HX@^Kl@GVGREVMd@CV@LHLLLLFH?PCl@WXKh@Q^Ij@G^?TBf@Lb@LNBNDLBLDH@D@FBLBJFRFNHZNf@XXVRXNTJTHTFPBP?`@?TANAJ?F?FBJHNPLRRXXRLPNNRXX\\d@ZV\\NZH`@@n@PVHNBT@V@LHJRJPHNDFHFLFLHLHVPRTNVX\\\\XTTbAxAVh@PVLFJ?PARININORYPe@LSR[NUNe@Le@DSBWLo@L]V[PWDQA[AOKQYQc@OUQS]Sg@M]Q_@KSUYMGMAU@S?KCGGEEACCCACACACACACAEAEAWCSEQEICGGEIECICI?IBIJUJQHSHUFQNi@P]PSNSFKDM@I?IAGEIIGWCk@@[@UAOCMGMUUc@KMQIM?K@ICEIEUAUDSPg@Xc@R[FO?OCOIMUKOGKIEKK[C_@Ci@AYKm@KQOQc@]c@M[KMKKUAK@KF_@D]A]DOJKJENC`@ATBj@Jn@Jl@HNHTRRJPB`@C^GXG^GRIJIFONs@?U@k@@IBGFAF?DBd@\\Z\\TV^X`@NNJZFLDLD`@`@JJJDNBVAZMJKLMJGL?NDLF\\N^TV^JN\\NN?PALCTCH?FBBD@D?DCFCBEBKBO?G?I?U?G?I@O?ICIGUYS][UOAQAi@@OHKJGNCPEXGPKHKBK?QGOIOMQGS?e@Ce@Ac@Fg@CUESEOEKAKBIFGJGLIHIDMDM@YBK@MDEFAF?H@FDDDBD?HAFEZWHEJGNGFANCN@FBVN^V`@D\\GPCF?DBBD@F?FCFQPYJIBM?SEUIMAE?E@CBAD@FBDDDZJ^DLC\\KNGJCF?F?DDDH@JAHCFIJGDGBMBSDK@M@O?e@KK?MBIDEHAL?LDLJNZZLJRNRJn@Lr@Hl@Jh@Xj@d@VPl@b@b@j@N\\BZMRYd@MNKTEZF`@P\\HVBh@?V?T?J?P@D@HBDBBD?FADGBE@I?MCOGWCU?c@AQEUEKEQCK?MFQFQLQTSPUFK@MCYGUMg@Qo@OY_@a@IMIQCOE]@M@KBIDGHAJ?JBNFZRRPPN\\^NJh@Fl@HRBTBXFj@Vf@ZNNXl@JZHJND`@@ZEPEZELCHIHGNSPQHKDM?UIi@Qu@Gg@Ee@@WFMJMRUVK`@Mb@GZOLGTWVONIJAJ@HBJJJNNJ\\Bf@?j@Gb@Eb@G\\Cl@EP@LCFEHIFQAUEKKEMAQ?a@DMCKCCECIAOBKDMFQLMJMFa@AQI]CO@OJe@HSPg@DU@WDo@Ci@Sc@OOa@SOAc@EKEGKEOASBOHYVk@RWZs@LYXs@HWJWPi@Lc@F_@@IDQBIBIHQDEJELKVUFMJa@DSHWDGDGDEROJGFCFCj@Od@QNGFIBM?OBUEGGCUKIIEK?QBMNONOJQHSDQDQDKDIPQLONUHWD]@c@@SBEDCBCFAH?h@BV@PAXKPMNEF@FFBLALIFMHQHUJGHGL?LBHFDDBD?HCLCFEJIDGBE@ABCBADAFCDCDCFCNCP?NFNHLLJJJRHRHNDHDJHPFVDR@P@T@JBLHFHBJ@H?JAJGFKFQBO?S@Y@UBSR[Ta@BI@KFi@Fo@BQFUDMFIHALAHDDR?RCXCLEPIf@GVOl@G\\Ch@Eb@CRGf@Gh@@LBRFPR`@JJFBD@DCDE@G?UA_@@MLYFMHOFMHOFOHMRGREj@ARHPJLNJVBP?B?@?@@X?HE\\Kh@IXQ`@CFENGPETCj@Ct@@XFVHXLR`@f@TXd@d@f@l@PX^bALb@XbAL\\LZVj@Zl@Zf@VTf@Tp@Nf@Jl@Fn@Hx@H\\FLFJJDR@b@Ah@Et@ALCf@Cr@AX?B?Z@THRJPZ`@RRPNd@b@n@ZXDRCTGRGJIj@c@NMHI`@]TQTOTMTEj@Gp@GT?X@n@RXJVL^TNFJHd@Vr@`@r@b@lAr@n@XZNRNZXRVTXTXj@n@TZj@x@LPh@z@d@r@`@t@V`@t@nAn@pAx@hBXv@Lb@f@lARTNJPB^@dADz@F|ATd@Fb@HdAR|@Pt@JXD\\Bz@FZ?VATENKLOJUFYJ}A@g@HcBDSHSRY\\e@POJGJCH@PFXRVPJDTJXHLB\\D^DN@N@`@BB?L?Z@B@d@?N@HAl@Bh@BT@X@T@n@@h@CR?h@CT?r@GD?`@GNCv@Mx@Op@I^GPCZERAp@C^EVA~@C`@A`@AfAI^Ed@GRIZIb@KPEHADANCVG\\IZIJC\\IFEJGDEDGVSLKHGf@_@x@i@VOBAXQ\\SFCx@]`@O`AQ~@G`AA^?\\Ab@?TAv@Cr@C^Dr@TXLZJ|@TJ@p@J|@J\\D~@JZDXDd@HNBLB\\@HEHWFe@B_@?SCSOi@KYSs@ESCOAUAQ?MBOBKPWLONCZGJ@TBfAf@NFV?t@Zz@ZrA?V?J?T@VBX@@G@CDCBAD?B@DB@B@FRR^b@VZd@h@NR`BxBlBnCTVrA|AFH\\^f@n@JNr@zA~@xBTXRV~@rAbAz@FFb@^`Av@~HhGXTv@n@t@n@t@j@HHBBTRVVLLFDf@b@JJpClCtAj@n@ZjA\\bCr@xBNp@Dz@FF?V@fAR|Br@~JjELJdInI~@n@lIzBbC|@~Aj@~EjAhATp@BlB?rDORAx@G`BAzBJV@dEVrATbEdAl@RjInBvCn@pARFDBADAB?B@@B^Hj@RVFXH\\H|@RTFTF\\RnAz@rCtBfA~@LNZ^fAhCf@fA^t@`@t@`@j@\\f@d@j@`@l@t@tAz@bBZb@HFNHNNTXFFBDPZz@rATb@NVZf@hCtER^HLvCtEnC`EjAbBf@n@v@dAbC~CTXRV~@bAj@j@z@r@x@r@h@\\r@\\x@\\VLVTpAdAB@l@b@dAd@ZLXNb@XLHf@\\tBpAf@p@dAnCv@nBHN@B^p@d@n@d@`@NL\\TfAp@BB?D?HRPHKJGLALBJFHJnAc@XKfCcALELANDNH^TNFVLhE|CvAjATPPNhBxAh@VlAZpBj@zFtAjEdFBBdAhAfAdAb@d@HXKnCMt@Mv@UlBItAMzBOrA^`@NNt@h@oBq@KGJk@JkAK?I@KBq@dAIL"; // Replace with actual polyline

        // Decode the polyline
        const decodedCoordinates = decodePolyline(encodedPolyline);

        // Wait for the map to load before adding the polyline
        myMap.on("load", () => {
            // Add a source for the polyline
            myMap.addSource("route", {
                type: "geojson",
                data: {
                    type: "Feature",
                    properties: {},
                    geometry: {
                        type: "LineString",
                        coordinates: decodedCoordinates,
                    },
                },
            });
            
            // Add a layer for the polyline
            myMap.addLayer({
                id: "route-line",
                type: "line",
                source: "route",
                layout: {
                    "line-join": "round",
                    "line-cap": "round",
                },
                paint: {
                    "line-color": "#e88205", // Orange color
                    "line-width": 4, // Line thickness
                },
            });
        });
    }, []);

    // Updated to full height and width
    return <div id="map" className="w-full lg:w-3/5 md:w-3/4 h-screen" />;
};

export default OlaMap;