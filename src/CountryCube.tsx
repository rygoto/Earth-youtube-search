import * as THREE from 'three';

interface CubeData {
    id: string;
    position: THREE.Vector3;
    name: string;
    tag: string;
    ename: string;
}

export const cubeData: CubeData[] = [
    //東アジア 
    { id: "JP", position: new THREE.Vector3(-0.6076, 0.5934, -0.5264), name: "日本", tag: "asia", ename: "Japan" },    //日本
    { id: "KR", position: new THREE.Vector3(-0.4928, 0.5976, -0.6257), name: "韓国", tag: "asia", ename: "Korea" },    //韓国
    //{ id: "CN", position: new THREE.Vector3(-0.3045, 0.7203, -0.6228) },    //中国
    { id: "TW", position: new THREE.Vector3(-0.471997, 0.404761, -0.781526), name: "台湾", tag: "asia", ename: "Taiwan" },    //台湾
    { id: "HK", position: new THREE.Vector3(-0.363409, 0.392849, -0.843914), name: "香港", tag: "asia", ename: "Hongkong" },
    //中央アジア
    { id: "IN", position: new THREE.Vector3(0.1860, 0.3510, -0.9161), name: "インド", tag: "middle", ename: "India" },    //インド
    { id: "RU", position: new THREE.Vector3(0.1894, 0.8973, -0.3938), name: "ロシア", tag: "middle", ename: "Russia" },    //ロシア
    { id: "KZ", position: new THREE.Vector3(0.4838, 0.7136, -0.5039), name: "カザフスタン", tag: "middle", ename: "Kazahsutan" },    //カザフスタン
    //{ id: "UZ", position: new THREE.Vector3(0.5439, 0.6473, -0.5314), name: "ウズベキスタン", tag: "middle", ename: "Uzbekistan" },    //ウズベキスタン
    //北アメリカ
    { id: "US", position: new THREE.Vector3(-0.159207, 0.635375, 0.755181), name: "アメリカ", tag: "america", ename: "America" },    //アメリカ
    { id: "CA", position: new THREE.Vector3(-0.110040, 0.809703, 0.575856), name: "カナダ", tag: "america", ename: "Canada" },    //カナダ
    { id: "MX", position: new THREE.Vector3(-0.200108, 0.453999, 0.866966), name: "メキシコ", tag: "america", ename: "Mexico" },     //メキシコ 
    //西ヨーロッパ
    { id: "ES", position: new THREE.Vector3(0.7690, 0.6295, 0.0766), name: "スペイン", tag: "west", ename: "Spain" },    //スペイン
    { id: "FR", position: new THREE.Vector3(0.656045, 0.751573, -0.064791), name: "フランス", tag: "west", ename: "France" },    //フランス
    { id: "DE", position: new THREE.Vector3(0.617656, 0.774008, -0.136663), name: "ドイツ", tag: "west", ename: "Germany" },    //ドイツ
    { id: "GB", position: new THREE.Vector3(0.594772, 0.803676, 0.005345), name: "イギリス", tag: "west", ename: "ENgland" },    //イギリス
    { id: "IT", position: new THREE.Vector3(0.730674, 0.655579, -0.185405), name: "イタリア", tag: "west", ename: "Italy" },    //イタリア
    { id: "NL", position: new THREE.Vector3(0.607081, 0.791872, -0.061196), name: "オランダ", tag: "west", ename: "Netherland" },    //オランダ
    { id: "BE", position: new THREE.Vector3(0.629091, 0.775030, -0.055266), name: "ベルギー", tag: "west", ename: "Bergium" },    //ベルギー
    { id: "PT", position: new THREE.Vector3(0.772607, 0.623555, 0.110967), name: "ポルトガル", tag: "west", ename: "Portogul" },    //ポルトガル
    //オセアニア
    { id: "AU", position: new THREE.Vector3(-0.6550, -0.4078, -0.6324), name: "オーストラリア", tag: "west", ename: "Australia" },    //オーストラリア
    { id: "NZ", position: new THREE.Vector3(-0.7327, -0.6686, -0.0936), name: "ニュージーランド", tag: "west", ename: "NewZealand" },    //ニュージーランド
    { id: "PG", position: new THREE.Vector3(-0.7352, 0.0517, -0.6688), name: "パプアニューギニア", tag: "west", ename: "Papua Niugini" },    //パプアニューギニア
    //{ id: "FJ", position: new THREE.Vector3(-0.9495, -0.2546, -0.1652), name: "フィジー", tag: "west", ename: "Fiji" },    //フィジー
    //{ id: "SB", position: new THREE.Vector3(-0.8586, -0.0550, -0.4985), name: "ソロモン諸島", tag: "west", ename: "Solomon Islands" },    //ソロモン諸島
    //{ id: "VU", position: new THREE.Vector3(-0.9284, -0.2611, -0.2450), name: "バヌアツ", tag: "west", ename: "Vanuatu" },    //バヌアツ 

]

