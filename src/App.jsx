
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MinimaxPage from './MinimaxPage'
import Home from './Home'
import PlayerVsPlayerPage from './PlayerVsPlayer'

const App = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/player-vs-ai' element={<MinimaxPage />}/>
                <Route path='/player-vs-player' element={<PlayerVsPlayerPage />} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App