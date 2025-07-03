import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigation from './BottomNavigation';
import Profile from '../Screens/Main/Profile';
import MyPost from '../Screens/Main/MyPost';
import Cms from '../Screens/Main/Cms';
import Order from '../Screens/Main/Order';
import AccountDetails from '../Screens/Main/AccountDetails';
import Ticket from '../Screens/Main/Ticket';
import Bids from '../Screens/Main/Bids';
import ShopList from '../Screens/Main/Shops/ShopList';
import ProductList from '../Screens/Main/Products/ProductList';
import ProductDetail from '../Screens/Main/Products/ProductDetail';
import OrderDetail from '../Screens/Main/OrderPages/OrderDetail';
import OffersScreen from '../Screens/Main/Bid/OffersScreen';
import Feedback from '../Screens/Main/OrderPages/Feedback';
import Notification from '../Screens/Main/Notification';
const Stack = createNativeStackNavigator();

const RootNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName="BottomNavigation"
            screenOptions={{
                headerShown: false,
            }}>

            <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
            <Stack.Screen name="EditProfile" component={Profile} />
            <Stack.Screen name="Cms" component={Cms} />
            <Stack.Screen name="Order" component={Order} />
            <Stack.Screen name="AccountDetails" component={AccountDetails} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
            <Stack.Screen name="OrderDetail" component={OrderDetail} />
            <Stack.Screen name="OffersScreen" component={OffersScreen} />
            <Stack.Screen name="Feedback" component={Feedback} />

            <Stack.Screen name="Notification" component={Notification} />



        </Stack.Navigator>
    );
};

export default RootNavigation;
