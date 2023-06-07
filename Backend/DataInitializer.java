package net.prabhu.Emps;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import net.prabhu.Emps.entity.Employee;

import net.prabhu.Emps.repository.EmployeeRepository;

@Component
public class DataInitializer implements ApplicationRunner {

    private final EmployeeRepository employeeRepository;

    public DataInitializer(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public void run(ApplicationArguments args) {
        // Create and save dummy data
        Employee employee1 = new Employee("John", "Doe", "john@example.com");
        Employee employee2 = new Employee("Jane", "Smith", "jane@example.com");

        employeeRepository.save(employee1);
        employeeRepository.save(employee2);
    }
}
