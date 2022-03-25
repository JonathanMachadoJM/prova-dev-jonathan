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
  MenuItem, Radio, RadioGroup, Select,
  TextField
} from '@mui/material';
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { db, storage } from '../../firebase-config';
import Header from '../Header';


const useQuery = () => {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Ticket = () => {
  const queryUrl = useQuery();
  const ID =  queryUrl.get("id");
  const isEdit = !!ID;
  const navigate = useNavigate();

  const [ambiente, setAmbiente] = useState(0);
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [operacao, setOperacao] = useState(0);
  const [prioridade, setPrioridade] = useState('');
  const [produto, setProduto] = useState('');
  const [status, setStatus] = useState(0);
  const [titulo, setTitulo] = useState('');
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

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
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

    const hash = makeid(30);
    let ext = "";

    const timestamp = new Date();

    const foo = {
      ambiente: data.get('ambiente-select'),
      categoria: data.get('categoria'),
      descricao: data.get('descricao'),
      operacao: data.get('operacao-select'),
      prioridade: data.get('prioridade'),
      produto: data.get('produto'),
      status: data.get('status-select'),
      titulo: data.get('titulo'),
      usuariosImpactados: data.get('usuarios-impactados-select'),
      datetime: timestamp,
    }

    if(isEdit){
      await updateDoc(doc(db, "ticket", ID), {
        ...foo,
        acao: "U",
      }).then((e) => {
        console.log(e);
        addDoc(collection(db, "log-ticket"), {
          idTicket: ID,
          acao: "U",
          username: "Jonathan",
          email: "jonathan@gmail.com",
          log: JSON.stringify(foo),
        }).then((log) => {
          console.log(log);
          navigate('/home');
        })
      });
    }
    else {
      if (data.get('anexo').type == "application/pdf") {
        ext = "pdf";
      }
      else if (data.get('anexo').type == "text/plain") {
        ext = "txt";
      }
      else {

        // TODO:
        console.log("erro");
        return;
      }

      const fileName = `files/${hash}.${ext}`;

      await addDoc(collection(db, "ticket"), {
        ...foo,
        acao: "I",
        anexo: fileName,
      }).then((e) => {
        addDoc(collection(db, "log-ticket"), {
          idTicket: e.id,
          acao: "I",
          username: "Jonathan",
          email: "jonathan@gmail.com",
          log: JSON.stringify(foo),
        }).then((log) => {
          console.log(log);
          navigate('/home');
        })
      });
      console.log(data.get('anexo'));
      const anexo = ref(storage, fileName);

      uploadBytesResumable(anexo, data.get('anexo')).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      });
    }
  };

  const getTicket = async () => {
    const ticket = await getDoc(doc(db, 'ticket', ID));
    const data = ticket.data();
    if (ticket.exists()) {
      setAmbiente(data.ambiente);
      setCategoria(data.categoria);
      setDescricao(data.descricao);
      setOperacao(data.operacao);
      setPrioridade(data.prioridade);
      setProduto(data.produto);
      setStatus(data.status);
      setTitulo(data.titulo);
      setUsuariosImpactados(data.usuariosImpactados);
    }
    else{
      navigate('/home');
    }
  }

  useEffect(() => {
    if (isEdit){
      getTicket();
    }
  }, []);

  return (
    <>
      <Header />
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
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
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
              label="Descrição"
              name="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
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
              value={produto}
              onChange={(e) => setProduto(e.target.value)}
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
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
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
                value={prioridade}
                onChange={(e) => setPrioridade(e.target.value)}
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
            <FormControl
              fullWidth
              sx={{
                width: 500,
                mt: 1,
                mb: 1
              }}
            >
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                id="status-select"
                value={status}
                label="Status"
                name="status-select"
                onChange={handleChangeStatus}
              >
                <MenuItem value={0}>Aberto</MenuItem>
                <MenuItem value={1}>Em análise</MenuItem>
                <MenuItem value={2}>Finalizado</MenuItem>
              </Select>
            </FormControl>
            {!isEdit &&
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
            }
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
      </Container>
    </>
  );
}

export default Ticket;
