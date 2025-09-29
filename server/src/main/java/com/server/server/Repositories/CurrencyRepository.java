package com.server.server.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.server.server.Models.Currency;

@Repository
public interface CurrencyRepository extends JpaRepository<Currency, Long> {
    boolean existsByCurrencyCode(String currencyCode);

    Currency findByCurrencyCode(String currencyCode);
}