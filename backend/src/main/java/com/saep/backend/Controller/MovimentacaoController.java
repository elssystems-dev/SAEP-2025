package com.saep.backend.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.saep.backend.Model.Movimentacao;
import com.saep.backend.Repository.MovimentacaoRepository;

@RestController
@RequestMapping("/api/movimentacao")
public class MovimentacaoController {
    private final MovimentacaoRepository movimentacaoRepository;
    
    MovimentacaoController(MovimentacaoRepository movimentacaoRepository) {
        this.movimentacaoRepository = movimentacaoRepository;
    }

    // Métodos para buscar todas as movimentações
    @GetMapping()
    public List<Movimentacao> buscarMovimentacao() {
        return movimentacaoRepository.findAll();
    }

    @PostMapping
    public Movimentacao registrarMovimentacao(@RequestBody Movimentacao movimentacao) {
        return movimentacaoRepository.save(movimentacao);
    }
}
