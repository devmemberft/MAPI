#!/bin/bash
set -e

# Crear bases de datos primera vez
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
	CREATE DATABASE artecolConnection;
	CREATE DATABASE accountingConnection;
	CREATE DATABASE appointmentsConnection;
