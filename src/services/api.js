// configurando o axios para uso
// axios é uma lib para lidar com reqs http

import axios from 'axios';

const api = axios.create({
    baseURL: "https://viacep.com.br/ws/" // url da api de cep. Dps disso, os parâmetros são o cep + "/json/" 
});

export default api;