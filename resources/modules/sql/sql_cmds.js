window.App = window.App || {};

App.sql_cmd = [
    'SELECT', 'FROM', 'WHERE', 'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 
    'CREATE TABLE', 'DROP TABLE', 'ALTER TABLE', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 
    'FULL OUTER JOIN', 'ON', 'AS', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'IN', 
    'BETWEEN', 'LIKE', 'IS NULL', 'IS NOT NULL', 'AND', 'OR', 'NOT', 'UNION', 'UNION ALL', 
    'COUNT()', 'MAX()', 'MIN()', 'AVG()', 'SUM()'
];