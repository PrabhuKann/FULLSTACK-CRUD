package net.prabhu.Emps.service;

import java.util.List;

import net.prabhu.Emps.entity.Employee;

public interface EmployeeService {

    List<Employee> getAllEmployees();

    Employee getEmployeeById(Long id);

    Employee createEmployee(Employee employee);

    Employee updateEmployee(Long id, Employee employee);

    void deleteEmployee(Long id);
}
