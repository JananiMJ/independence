-- Run this once in phpMyAdmin (hPanel → Databases → phpMyAdmin → your database → SQL tab).
-- Creates the tables used by the enquiry form and the /metrics page.

CREATE TABLE IF NOT EXISTS leads (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100)  NOT NULL,
  email       VARCHAR(255)  NOT NULL,
  phone       VARCHAR(50)   NULL,
  role        VARCHAR(50)   NULL,
  age_group   VARCHAR(50)   NULL,
  message     TEXT          NULL,
  status      VARCHAR(20)   NOT NULL DEFAULT 'new',
  created_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS lead_events (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  event_type  ENUM('form_view', 'form_start', 'form_submit') NOT NULL,
  path        VARCHAR(300)  NULL,
  referrer    VARCHAR(500)  NULL,
  created_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX lead_events_type_created_idx (event_type, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
