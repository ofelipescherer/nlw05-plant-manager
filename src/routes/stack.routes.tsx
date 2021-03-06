import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Confirmation } from '../pages/Confirmation';
import colors from '../styles/colors';
import { PlantSelect } from '../pages/PlantSelect';
import { ChosenPlant } from '../pages/ChosenPlant';
import { MyPlants } from '../pages/MyPlants';
import AuthRoutes from './tab.routes';



const stackRoutes = createStackNavigator();


const AppRoutes: React.FC = () => (
   <stackRoutes.Navigator
        //I don't want header to show
        headerMode='none'
        //Set deafult styles
        screenOptions={{
            cardStyle: {
                backgroundColor: colors.white
            }
        }}
   >

     <stackRoutes.Screen 
            name='Welcome'
            component={Welcome}
     />

     <stackRoutes.Screen 
          name='UserIdentification'
          component={UserIdentification}
     />

     <stackRoutes.Screen 
          name='Confirmation'
          component={Confirmation}
     />

     <stackRoutes.Screen 
          name='PlantSelect'
          component={AuthRoutes}
     />

     <stackRoutes.Screen 
          name='ChosenPlant'
          component={ChosenPlant}
     />

     <stackRoutes.Screen 
          name='MyPlants'
          component={AuthRoutes}
     />

   </stackRoutes.Navigator>
)

export default AppRoutes;