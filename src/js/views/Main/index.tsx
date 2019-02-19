import React from 'react';
import './index.css';

import {Consumer} from '../../contexts/korennaerContext';

const Main = () => <Consumer>{() => <div>hello main</div>}</Consumer>;

export default Main;
