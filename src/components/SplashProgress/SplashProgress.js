/**
 * Created by bedeho on 08/09/17.
 */

import React from 'react'
import PropTypes from 'prop-types'
import LinearProgress from 'material-ui/LinearProgress'
import SvgIcon from 'material-ui/SvgIcon'


// Replace later after rebase
const JoyStreamIcon = (props) => {

    let style = {
        height : 21 * (40/21),
        width : 104 * (40/21),
        fill : 'hsla(201, 22%, 70%, 1)'
    }

    return (
        <SvgIcon style={style}
                 viewBox={'0 0 104 21'}
                 stroke="none"
                 strokeWidth="1"
                 fillRule="evenodd">
            <path d="M8,0 L8,14.074563 C8,17.7529573 6.20599739,20 2.01192028,20 C1.28478301,20 0.606071894,19.9340001 0,19.7356619 L0.533432669,16.6959435 C0.921214379,16.8062818 1.45464705,16.8722817 1.91506798,16.8722817 C3.73328367,16.8722817 4.09722481,15.9909292 4.09722481,14.2509012 L4.09722481,0 L8,0" id="Fill-5"></path>
            <path d="M17.7477888,7.32695203 C17.5166247,7.0610958 17.1469753,6.92782685 16.5923236,6.92782685 C15.9222674,6.92782685 15.5064562,7.12755986 15.298373,7.37160224 C14.8822067,7.83719147 14.7206405,8.87982503 14.7206405,10.0996961 C14.7206405,11.3860312 14.9052876,12.340046 15.2522112,12.6948618 C15.4830202,12.9389042 15.8991865,13.0943278 16.4538382,13.0943278 C17.0777326,13.0943278 17.4704629,12.8945948 17.701627,12.6283978 C18.1174382,12.1624677 18.3024404,11.2087937 18.3024404,9.89996308 C18.3024404,8.68009203 18.1408742,7.77072741 17.7477888,7.32695203 Z M20.3822067,14.6690147 C19.4117438,15.5562246 18.1866809,16 16.4076764,16 C14.6744787,16 13.4728517,15.5783793 12.5712764,14.7797881 C11.3696494,13.7374954 11,12.340046 11,10.1661601 C11,7.88150084 11.4161663,6.48439231 12.5943573,5.37529469 C13.5651753,4.46558923 14.812964,4 16.5923236,4 C18.3024404,4 19.5502292,4.42127986 20.4514494,5.21987105 C21.6299955,6.26250462 22,7.70426336 22,9.87780839 C22,12.1184992 21.6069146,13.5377624 20.3822067,14.6690147 L20.3822067,14.6690147 Z" id="Fill-6"></path>
            <path d="M30.0736685,14.9826898 C29.0486648,18.8493785 27.3826645,21 24.712666,21 C23.8580039,21 23.00367,20.7711207 22.5766672,20.4508304 L23.5806654,17.5453643 C23.8580039,17.7281865 24.3066687,17.8195975 24.6270028,17.8195975 C25.7166642,17.8195975 26.2716694,17.1101069 26.7630016,15.2340703 L25.2250037,15.2340703 L22,4 L25.5669999,4 L27.6386693,12.9688334 L29.5183351,4 L33,4 L30.0736685,14.9826898" id="Fill-7"></path>
            <path d="M43.5224376,2.78666235 C42.4545137,2.04493364 41.1138467,1.79769073 40.0452244,1.79769073 C38.4999127,1.79769073 37.3635411,2.31462178 37.3635411,4.08986727 C37.3635411,7.50568685 45,6.20213661 45,11.6179994 C45,13.1912377 44.2729178,14.3594259 43.2723939,15.0341642 C42.340667,15.6629762 41,16 39.6362843,16 C38.1136721,16 36.1136721,15.5731952 35,14.4719974 L36.0909726,12.9439948 C37.1819452,13.8428402 38.6137594,14.179864 39.9544264,14.179864 C41.4997381,14.179864 42.8407543,13.7302687 42.8407543,11.7081256 C42.8407543,7.97772742 35.2273442,9.41560376 35.2273442,4.13510305 C35.2273442,2.71932664 35.8182294,1.79769073 36.7045574,1.12364303 C37.7274315,0.359469084 38.9773005,0 40.3633665,0 C41.7043827,0 43.4316396,0.359469084 44.5453117,1.25865976 L43.5224376,2.78666235" id="Fill-8"></path>
            <path d="M55,15.7009192 C54.2914835,15.9080839 53.4187101,16 52.6398495,16 C49.737615,16 49.147668,14.7117605 49.147668,12.020033 L49.147668,6.3834551 L47,6.3834551 L47,4.56563752 L49.147668,4.56563752 L49.147668,1.25276927 L51.2478357,1 L51.2478357,4.56563752 L54.8346553,4.56563752 L54.8346553,6.3834551 L51.2478357,6.3834551 L51.2478357,11.9047844 C51.2478357,13.5150837 51.3656801,14.1825359 52.9466074,14.1825359 C53.5129855,14.1825359 54.2447083,14.0902663 54.8110864,13.9523922 L55,15.7009192" id="Fill-9"></path>
            <path d="M58.8170111,4.28182228 L58.7959095,6.6067659 C59.4085056,4.77510149 60.507088,4 61.7326047,4 C62.1971648,4 62.6409479,4.1172756 63,4.32873252 L62.4718104,6.3014885 C62.2818959,6.16039693 61.8592144,6.09003157 61.5634672,6.09003157 C59.7253544,6.09003157 58.9014176,8.69679747 58.9014176,11.4912043 L58.9014176,16 L57,16 L57,4.28182228 L58.8170111,4.28182228" id="Fill-10"></path>
            <path d="M71.9883644,8.72178145 C72.009641,6.8562159 71.6203457,5.72753281 69.7164229,5.72753281 C67.7476729,5.72753281 67.1848404,6.92523227 67.0767952,8.7447869 L71.9883644,8.72178145 Z M73.8919548,14.1347884 C72.7234043,15.4015042 71.4255319,16 69.6299867,16 C68.115359,16 67.0555186,15.5625424 66.3198138,14.7792951 C65.4541223,13.858015 65,12.5449344 65,10.3569385 C65,8.5377378 65.3244681,6.6258074 66.2765957,5.49712432 C66.96875,4.6678661 68.0505319,4 69.7380319,4 C72.853391,4 74,6.21100133 74,8.92918449 C74,9.29762572 73.9787234,9.89647545 73.9351729,10.333933 L67.0119681,10.379944 C67.0555186,12.729332 67.4015957,14.2264563 69.6299867,14.2264563 C70.927859,14.2264563 71.9883644,13.7199823 72.8321144,12.8447132 L73.8919548,14.1347884 L73.8919548,14.1347884 Z" id="Fill-11"></path>
            <path d="M82.0997991,10.5078014 C80.2534179,10.5078014 79.122966,10.8078014 79.122966,12.5617021 C79.122966,13.6464539 79.5385525,14.2925532 80.6924077,14.2925532 C82.1692999,14.2925532 83.9227769,13.1617021 83.9919231,10.5078014 L82.0997991,10.5078014 Z M77.4847327,5.61560284 C78.5690871,4.41560284 79.9768331,4 81.6611639,4 C84.5227532,4 86,5.17695035 86,8.2 L86,15.7464539 L84.0844726,15.7464539 L84.0614239,13.8308511 C83.3231551,15.3078014 81.9154092,16 80.3920649,16 C79.3307592,16 78.4768922,15.6769504 77.9230133,15.1234043 C77.2996336,14.5464539 77,13.7386525 77,12.6539007 C77,11.3156028 77.4613293,10.4847518 78.315551,9.88439716 C79.3073559,9.19255319 80.7151018,8.93865248 82.3072377,8.93865248 L83.969229,8.93865248 L83.969229,8.36170213 C83.969229,6.37695035 83.3692526,5.73085106 81.5923722,5.73085106 C80.3229187,5.73085106 79.4460029,6.05390071 78.6151846,6.90780142 L77.4847327,5.61560284 L77.4847327,5.61560284 Z" id="Fill-12"></path>
            <path d="M90.894377,4.28182228 L90.894377,6.7240415 C91.4007175,5.08001804 92.5680762,4 94.3521143,4 C95.9824902,4 97.0175098,4.91583221 97.3698497,6.77095174 C97.9205289,5.12728913 99.1322262,4 100.872264,4 C102.854641,4 104,5.43220568 104,7.89824087 L104,16 L102.017623,16 L102.017623,8.39152007 C102.017623,6.81786198 101.709283,5.92548489 100.519924,5.92548489 C98.955887,5.92548489 97.4801886,7.56950834 97.4801886,11.8199369 L97.4801886,16 L95.4978113,16 L95.4978113,8.34424899 C95.4978113,6.88858818 95.2114716,5.92548489 93.9997744,5.92548489 C92.4357372,5.92548489 90.9820389,7.56950834 90.9820389,11.8199369 L90.9820389,16 L89,16 L89,4.28182228 L90.894377,4.28182228" id="Fill-13"></path>
        </SvgIcon>
    )

}

const Icon = (props) => {

    let firstFill = 'hsla(201, 22%, 70%, 1)'
    let secondFill = firstFill

    if(props.color) {
        firstFill = '#009D90'
        secondFill = '#DC3E38'
    }

    return (
        <SvgIcon {...props} viewBox={"0 0 130 130"}>
            <path d="M48.0568597,106.681111 L53.1720629,117.598889 C61.5745072,112.5 67.9348441,104.701111 71.3037695,95.2544444 C75.1760468,84.3977778 74.6241258,72.69 69.7495601,62.2888889 C63.1099513,48.1188889 68.0463321,31.3988889 80.6775947,23.01 L75.5601837,12.0922222 C57.0068096,23.3688889 49.5393193,47.2477778 58.9826865,67.4 C62.5039421,74.9144444 62.9035329,83.37 60.1086052,91.2088889 C57.8170295,97.6311111 53.6091843,103 48.0568597,106.681111 Z M49.0481097,129.634444 L36.4356125,102.717778 L40.4282085,100.821111 C45.7608686,98.2888889 49.7987222,93.8088889 51.7966759,88.2055556 C53.7946297,82.6022222 53.5109424,76.56 50.9952867,71.1922222 C38.8386762,45.2488889 49.9168332,14.1877778 75.6904371,1.95111111 L79.6830331,0.0544444444 L92.297738,26.9711111 L88.3040381,28.8677778 C77.275554,34.1033333 72.5345532,47.3955556 77.7369599,58.4966667 C83.6171256,71.0455556 84.2849499,85.1666667 79.6145949,98.2577778 C74.9464477,111.35 65.5085997,121.82 53.0418096,127.738889 L49.0481097,129.634444 L49.0481097,129.634444 Z" id="Fill-1"
                  fill={firstFill} mask="url(#mask-2)"></path>
            <path d="M80.0660663,67.2888889 C90.5161372,67.2888889 100.245399,72.6555556 105.921354,81.2655556 L116.768808,76.1144444 C109.070615,63.3455556 95.0937695,55.3066667 80.0340548,55.3066667 C73.7090409,55.3066667 67.5838224,56.6922222 61.827287,59.4255556 C57.6702185,61.3988889 53.241605,62.4 48.6672842,62.4 C38.2172133,62.4011111 28.4868472,57.0333333 22.8119961,48.4233333 L11.9634382,53.5744444 C19.6616314,66.3433333 33.6384772,74.3833333 48.6981918,74.3833333 C55.0232057,74.3833333 61.1484243,72.9966667 66.9049596,70.2633333 C71.063132,68.2888889 75.4917455,67.2888889 80.0660663,67.2888889 Z M101.991677,92.9588889 L100.107419,88.9388889 C96.4746757,81.1866667 88.6086985,76.1777778 80.0660663,76.1777778 C76.8042135,76.1777778 73.6439143,76.8922222 70.6723719,78.3033333 C63.7292066,81.6 56.3356737,83.2722222 48.6981918,83.2722222 C28.7495615,83.2722222 10.3739059,71.5644444 1.88425807,53.4455556 L0,49.4266667 L26.7416732,36.7288889 L28.6248274,40.7488889 C32.2586748,48.5033333 40.124652,53.5122222 48.6661804,53.5111111 C51.929137,53.5111111 55.0894362,52.7955556 58.0598747,51.3855556 C65.0030401,48.0888889 72.3965729,46.4177778 80.0340548,46.4177778 C99.9826851,46.4177778 118.358341,58.1244444 126.849092,76.2433333 L128.732247,80.2633333 L101.991677,92.9588889 L101.991677,92.9588889 Z" id="Fill-3"
                  fill={secondFill} mask="url(#mask-2)"></path>
        </SvgIcon>
    )
}

function getStyles(props) {

    return {
        root : Object.assign({
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: 'center',
            height : "100%", // quick hack
            width : "100%",
            backgroundColor: 'rgb(28, 38, 43)'
        }, props.style),
        centeredContainer : {
            display : 'flex',
            width : '400px',
            flexDirection: 'column',
            alignItems: 'center'
        },
        icon : {
            height : '90px',
            width : '90px'
        },
        linearProgress : {
            marginTop : '50px',
            height : '8px',
            borderRadius : '50px',
            backgroundColor : 'hsla(200, 21%, 31%, 1)',
            //border: '1px solid hsla(201, 22%, 70%, 1)'
        },
        progressText : {
            fontFamily : 'Arial',
            fontSize : '14px',
            fontWeight : 'bold',
            color : 'hsla(200, 21%, 31%, 1)',
            textAlign : 'center',
            marginTop : '50px'
        }
    }
}

const SplashProgress = (props) => {

    let styles = getStyles(props)

    return (
        <div style={styles.root} className={props.className ? props.className : ''} >

            <div style={styles.centeredContainer}>

                { /** <Icon style={styles.icon}/> **/ }

                 <JoyStreamIcon style={styles.icon}/>

                <LinearProgress mode="determinate"
                                color={'hsla(201, 22%, 70%, 1)'}
                                value={props.progressPercentage}
                                style={styles.linearProgress}
                />

                <span style={styles.progressText}>
                    {props.progressText}
                </span>

            </div>

        </div>
    )

}

SplashProgress.propTypes = {
    progressPercentage : PropTypes.number.isRequired,
    progressText : PropTypes.string.isRequired,
    className : PropTypes.string,
    style : PropTypes.object
}

export default SplashProgress