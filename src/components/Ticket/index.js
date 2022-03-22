import React, {useState, useEffect} from 'react';
import { collection, addDoc} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import {
//   useLocation,
// } from "react-router-dom";

import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  RadioGroup,
  Radio,
  Select,
  TextField
} from '@mui/material';

import { db, storage } from '../../firebase-config';

// function useQuery() {
//   const { search } = useLocation();

//   return React.useMemo(() => new URLSearchParams(search), [search]);
// }

const Ticket = () => {
  // const query = useQuery();
  // const [ID] =  useState(query.get("id"));
  // const [anexo, setAnexo] = useState();
  const [ambiente, setAmbiente] = useState(0);
  // const [categoria, setCategoria] = useState('');
  // const [descricao, setDescricao] = useState('');
  const [operacao, setOperacao] = useState(0);
  // const [prioridade, setPrioridade] = useState('');
  // const [produto, setProduto ] = useState('');
  // const [titulo, setTitulo] = useState('');
  const [usuariosImpactados, setUsuariosImpactados] = useState(0);

  const handleChangeUsuariosImpactados = (event) => {
    setUsuariosImpactados(event.target.value);
  };

  const handleChangeOperacao = (event) => {
    setOperacao(event.target.value);
  };

  const handleChangeAmbiente = (event) => {
    setAmbiente(event.target.value);
  };

  const makeid = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
    }
    return result;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let ext = "";
    if (data.get('anexo').type == "application/pdf") {
      ext = "pdf";
    }
    else if (data.get('anexo').type == "text/plain") {
      ext = "txt";
    }
    else {
      // TODO
      console.log("erro");
      return;
    }
    const hash = makeid(30);

    const fileName = `files/${hash}.${ext}`;

    await addDoc(collection(db, "ticket"), {
      ambiente: data.get('ambiente-select'),
      categoria: data.get('categoria'),
      descricao: data.get('descricao'),
      operacao: data.get('operacao-select'),
      prioridade: data.get('prioridade'),
      produto: data.get('produto'),
      usuariosImpactados: data.get('usuarios-impactados-select'),
      titulo: data.get('titulo'),
      anexo: fileName,
    });
    console.log(data.get('anexo'));
    const anexo = ref(storage, fileName);

    uploadBytesResumable(anexo, data.get('anexo')).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
      });
    });
  };

  const download = async () => {
    getDownloadURL(ref(storage, 'files/ProvaDEVversao3.pdf'))
      .then((url) => {
        console.log(url);
      });
  }

  useEffect(() => {

  });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          flexDirection='column'
          noValidate
          sx={{
            mt: 1,
            display: 'flex'
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="titulo"
            label="Título"
            name="titulo"
            autoFocus
            sx={{
              width: 500,
              mt: 1,
              mb: 1
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="descricao"
            label="Descricao"
            name="descricao"
            multiline={true}
            minRows={2}
            maxRows={3}
            sx={{
              width: 500,
              mt: 1,
              mb: 1
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="produto"
            label="Produto"
            name="produto"
            sx={{
              width: 500,
              mt: 1,
              mb: 1
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="categoria"
            label="Categoria"
            name="categoria"
            sx={{
              width: 500,
              mt: 1,
              mb: 1
            }}
          />
          <FormControl>
            <FormLabel id="prioridade">Prioridade</FormLabel>
            <RadioGroup
              row
              aria-labelledby="prioridade"
              name="prioridade"
            >
              <FormControlLabel value={0} control={<Radio />} label="Alta" />
              <FormControlLabel value={1} control={<Radio />} label="Médio" />
              <FormControlLabel value={2} control={<Radio />} label="Baixa" />
            </RadioGroup>
          </FormControl>

          <FormControl
            fullWidth
            sx={{
              width: 500,
              mt: 1,
              mb: 1
            }}
          >
            <InputLabel id="usuarios-impactados-label">Usuários Impactados</InputLabel>
            <Select
              labelId="usuarios-impactados-label"
              id="usuarios-impactados-select"
              value={usuariosImpactados}
              label="Usuários Impactados"
              name="usuarios-impactados-select"
              onChange={handleChangeUsuariosImpactados}
            >
              <MenuItem value={0}>Apenas 1</MenuItem>
              <MenuItem value={1}>1 a 10 Usuários</MenuItem>
              <MenuItem value={2}>11 a 30 Usuários</MenuItem>
              <MenuItem value={3}>31 a 50 Usuários</MenuItem>
              <MenuItem value={4}>Mais de 50 Usuários</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            sx={{
              width: 500,
              mt: 1,
              mb: 1
            }}
          >
            <InputLabel id="operacao-label">Sua operação está parada?</InputLabel>
            <Select
              labelId="operacao-label"
              id="operacao-select"
              value={operacao}
              label="Sua operação está parada?"
              name="operacao-select"
              onChange={handleChangeOperacao}
            >
              <MenuItem value={0}>Operação parada</MenuItem>
              <MenuItem value={1}>Operação consegue trabalhar</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            sx={{
              width: 500,
              mt: 1,
              mb: 1
            }}
          >
            <InputLabel id="ambiente-label">Informações de Ambiente</InputLabel>
            <Select
              labelId="ambiente-label"
              id="ambiente-select"
              value={ambiente}
              label="Informações de Ambiente"
              name="ambiente-select"
              onChange={handleChangeAmbiente}
            >
              <MenuItem value={0}>Dados/Ambiente de Testes - Somente testes</MenuItem>
              <MenuItem value={1}>Ambiente de produção - Cliente Ativo/Licença</MenuItem>
            </Select>
          </FormControl>
          <Input
            required
            id="anexo"
            label="Anexo"
            name="anexo"
            type="file"
            sx={{
              width: 500,
              mt: 1,
              mb: 1
            }}
          />
          <Grid container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                height: 36.5,
                width: 145,
                mt: 1,
                mb: 1
              }}
            >
              Salvar
            </Button>
          </Grid>
        </Box>
      </Box>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        onClick={download}
        sx={{
          height: 36.5,
          width: 145,
          mt: 1,
          mb: 1
        }}
      >
        Inscrever-se
      </Button>
    </Container>
  );
}

export default Ticket;
