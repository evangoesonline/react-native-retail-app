import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from '../home'
import scanCode from '../scanCode'
import notePad from '../notePad'
import lookup from '../lookup'
import reorder from '../reorder'


const screens = {
    "Evan's Retail Multitool": {
        screen: Home
    },
    "Scan barcode": {
        screen: scanCode
    },
    "Notes": {
        screen: notePad
    },
    "Item lookup": {
        screen: lookup
    },
    "Reorder": {
        screen: reorder
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);