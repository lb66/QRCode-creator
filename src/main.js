import { createApp } from 'vue'
import App from './App.vue'
import { ElButton,ElInput,ElInputNumber, ElIcon,ElCheckbox} from 'element-plus';
const app = createApp(App)

app.use(ElButton)
app.use(ElInput)
app.use(ElInputNumber)
app.use(ElIcon)
app.use(ElCheckbox)
app.mount('#app')
